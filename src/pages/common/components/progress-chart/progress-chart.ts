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
        },
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        series: [
            {
                data: [
                    {
                        x: 'Apple',
                        y: 54
                    },
                    {
                        x: 'Orange',
                        y: 66
                    },
                ],
            },
        ],
        xaxis: {
          type: 'category'
        }
    };

    public chart: ApexCharts;

    bind() {
        const data =  this.chartConfig.series[0]["data"];

        data.splice(0, data.length, ...this.data);
    }
}
