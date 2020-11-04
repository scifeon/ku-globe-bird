import { scifeonRoute } from "@scifeon/plugins";
import { IListViewConfig } from "@scifeon/ui";
import { autoinject } from "aurelia-framework";
import BirdsDataAPI from "./data/birds.data-api";
import ITaxonomyRecord from "./interfaces/taxonomy-record.interface";
import { LIST_VIEW_CONFIG } from "./static/birds.static";
import "./styles/birds.scss";

/**
 * Page for overview of the sequencing progress of bird genomes.
 */
@autoinject
@scifeonRoute({ title: "Birds", route: "b10k/birds" })
export class BirdsPage {
    public listViewConfig: IListViewConfig = LIST_VIEW_CONFIG;

    public records: ITaxonomyRecord[];

    constructor(private data: BirdsDataAPI) {}

    // life cycle hooks.

    public async init() {
        // this.records = await this.data.getRecords();
        // console.log("BirdsPage -> init -> this.records", this.records)
    }
}
