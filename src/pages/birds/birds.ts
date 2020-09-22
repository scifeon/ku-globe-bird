import { scifeonRoute } from "@scifeon/plugins";
import { IListViewConfig } from "@scifeon/ui";
import { autoinject } from "aurelia-framework";
import BirdsDataAPI from "./data/birds.data-api";
import BirdsLogic from "./logic/birds.logic";
import { LIST_VIEW_CONFIG } from "./static/birds.static";

/**
 * Page for overview of the sequencing progress of bird genomes.
 */
@autoinject
@scifeonRoute({ title: "Bird", route: "b10k/birds" })
export class BirdsPage {
    public listViewConfig: IListViewConfig = LIST_VIEW_CONFIG;
    public records: any[] = [];

    constructor(
        private data: BirdsDataAPI,
        private logic: BirdsLogic,
    ) {}

    // life cycle hooks.

    public async init() {
        this.records = await this.data.getRecords();
        this.logic.compileLatinNames(this.records);
        console.log("BirdsPage -> init -> this.records", this.records)
    }
}
