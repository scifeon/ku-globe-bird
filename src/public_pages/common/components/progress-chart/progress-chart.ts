import { CustomEventFactory, EventType } from "@scifeon/core";
import { IApexChartConfig } from "@scifeon/ui";
import ApexCharts from "apexcharts/dist/apexcharts.common.js";
import { autoinject, bindable, customElement } from "aurelia-framework";
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
                dataPointSelection: ($event, chartContext, options) => {
                    const progressStatus = this.findStatus(options.dataPointIndex);

                    const event = CustomEventFactory.create(EventType.CLICK, $event, "chart", { progressStatus });
                    this.element.dispatchEvent(event);
                }
            },
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            enabled: false,
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

    constructor(private element: Element) {}

    public get ready() {
        if (this.data.length) {
            return true;
        }

        return false;
    }

    private findStatus(index: number) {
        const progressStates = ["statusCovered", "statusDna", "statusSequencing", "statusAssembly"];
        return progressStates[index];
    }

    private updateStatus(data) {
        for (const obj of data) {
            obj.x = this.statusMap[obj.x]
            obj.x = obj.x
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
