import { scifeonRoute } from "@scifeon/plugins";
import { IListViewConfig } from "@scifeon/ui";
import { autoinject } from "aurelia-framework";
import BirdsDataAPI from "./data/birds.data-api";
import BirdsLogic from "./logic/birds.logic";
import { LIST_VIEW_CONFIG } from "./static/birds.static";
import "./styles/birds.scss";

/**
 * Page for overview of the sequencing progress of bird genomes.
 */
@autoinject
@scifeonRoute({ title: "Birds", route: "b10k/birds" })
export class BirdsPage {
    public loading = false;
    public listViewConfig: IListViewConfig = LIST_VIEW_CONFIG;
    public records: any[] = [];

    constructor(
        private data: BirdsDataAPI,
        private logic: BirdsLogic,
    ) {}

    // Life cycle hooks.

    public async bind() {
        this.loading = true;
        const taxItems = await this.data.getAllEntities("TaxonomyItem");
        const samples = await this.data.getAllEntities("Sample");
        this.records.push(...this.logic.compileRecords(taxItems, samples));
        this.loading = false;
    }
}
