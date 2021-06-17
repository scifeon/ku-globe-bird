import { scifeonRoute } from "@scifeon/plugins";
import { autoinject } from "aurelia-framework";
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
    ) {}

    public stats = [];

    public phylo = [
        { family: "a1 / 3", genus: "b1 / 2" },
        { family: "a2 / 3", genus: "b2 / 2" },
        { family: "a3 / 3", genus: "b3 / 2" },
        { family: "a4 / 3", genus: "b4 / 2" },
    ];

    // Life cycle hooks.

    async bind() {
        const taxItems = await this.data.getAllTaxonomyItems();
        const samples = await this.data.getAllSamples();
        const records = this.commonLogic.compileRecords(taxItems, samples);
        const stats = this.commonLogic.compileStats(records);
        this.stats.push(...stats)
    }
}
