import { IApexChartConfig } from "@scifeon/ui";
import ApexCharts from "apexcharts/dist/apexcharts.common.js";
import { autoinject, bindable, customElement } from "aurelia-framework";
import { Router } from "aurelia-router";
import { STATUS_MAP } from "./static/progress-chart.static";

@customElement("progress-chart")
@autoinject
export class ProgressChart {
    @bindable public readonly data: any;

    public chart: ApexCharts;

    public chartConfig: IApexChartConfig = {
        chart: {
            type: 'bar',
            height: 350,
            events: {
                dataPointSelection: (event, chartContext, options) => {
                    const status = options.w.config.series[0].data[options.dataPointIndex].x

                    this.router.navigate(`/entity/Sample?$filter=attributes.sampleDataLevel%20in%20('${status}')%20and%20status%20not_in%20('Canceled'%2C'Deleted'%2C'Discarded')&$select=Name%2CDescription%2CDateTaken%2Cattributes.sampleDataLevel%2CTaxonomyItemID`);
                }
            },
            toolbar: {
                show: false,
            },
        },
        legend: {
            show: false,
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    position: 'top',
                },
            }
        },
        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                fontSize: '16px',
                colors: ['#000000']
            }
        },
        series: [
            {
                data: [],
            },
        ],
        xaxis: {
          type: 'category',
          labels: {
            style: {
                fontSize: '16px'
            }
       }
        },
        yaxis: {
            max: 10000, // total number of taxItems
            labels: {
                style: {
                    fontSize: '16px'
                }
           }
        }
    };

    private statusMap = STATUS_MAP;

    constructor(private router: Router) {}

    public get ready() {
        if (this.data.length) {
            return true;
        }

        return false;
    }

    private updateStatus(data) {
        for (const obj of data) {
            obj.x = this.statusMap[obj.x]
        }

        return data;
    }

    public readyChartHandler(event: CustomEvent) {
        this.chart = event.detail.data.chart;
        const data =  this.chartConfig.series[0]["data"];

        const newData = this.updateStatus(this.data);

        data.splice(
            0,
            data.length,
            ...newData,
        );

        this.chart.updateOptions(this.chartConfig);
    }
}
