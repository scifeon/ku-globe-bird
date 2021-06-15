import { IApexChartConfig } from "@scifeon/ui";
import ApexCharts from "apexcharts/dist/apexcharts.common.js";
import { bindable, customElement } from "aurelia-framework";

@customElement("progress-chart")
export class ProgressChart {
    @bindable public readonly data: any;

    public chartConfig: IApexChartConfig = {
        chart: {
            type: 'bar',
            height: 350,
            events: {
                dataPointSelection: (event, chartContext, config) => {
                    console.log("LIGE HER", chartContext, config, event);
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

    public chart: ApexCharts;

    public get ready() {
        if (this.data.length) {
            return true;
        }

        return false;
    }


    attached() {
        const data =  this.chartConfig.series[0]["data"];

        data.splice(0, data.length, ...this.data);
    }
}
