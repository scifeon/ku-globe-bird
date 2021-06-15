import { scifeonRoute } from "@scifeon/plugins";
import { autoinject } from "aurelia-framework";
import StatsLogic from "./logic/stats.logic";
import CommonData from "../common/data/common.data";
import CommonLogic from "../common/logic/common.logic";

/**
 * Page for aggregated statistics of B10K progress.
 */
@autoinject
@scifeonRoute({ title: "Birds", route: "b10k/stats" })
export class BirdsPage {

    constructor(
        private data: CommonData,
        private commonLogic: CommonLogic,
        private logic: StatsLogic,
    ) {}

    public stats = [
                    {
                        x: 'Fisk',
                        y: 44
                    },
                    {
                        x: 'Fugl',
                        y: 36
                    },
                    {
                        x: 'Hammer',
                        y: 16
                    },
                    {
                        x: 'Ost',
                        y: 96
                    },
                ];

    // Life cycle hooks.

    async attached() {
        const taxItems = await this.data.getAllTaxonomyItems();
        const samples = await this.data.getAllSamples();
        const records = this.commonLogic.compileRecords(taxItems, samples);

        const stats = this.logic.compileStats(records);

        console.log({samples, taxItems, stats})
    }
}
