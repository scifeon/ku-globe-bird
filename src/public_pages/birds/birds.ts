import { PAGE_TYPE, scifeonRoute } from "@scifeon/plugins";
import { IListViewConfig } from "@scifeon/ui";
import { autoinject } from "aurelia-framework";
import CommonData from "../common/data/common.data";
import ITaxItemRecord from "../common/interfaces/tax-item-record.interface";
import CommonLogic from "../common/logic/common.logic";
import { LIST_VIEW_CONFIG } from "./static/birds.static";
import "./styles/birds.scss";

/**
 * Page for overview of the sequencing progress of bird genomes.
 */
@autoinject
@scifeonRoute({
    title: "Birds",
    route: "b10k/birds",
    type: PAGE_TYPE.PUBLIC,
})
export class BirdsPage {
    public listViewConfig: IListViewConfig = LIST_VIEW_CONFIG;
    public records: ITaxItemRecord[] = [];
    public stats = [];

    constructor(
        private data: CommonData,
        private logic: CommonLogic,
    ) {}

    // Life cycle hooks.

    public async bind() {
        const taxItems = await this.data.getAllTaxonomyItems();
        const samples = await this.data.getAllSamples();
        this.records.push(...this.logic.compileRecords(taxItems, samples));
        this.stats.push(...this.logic.compileStats(this.records));
    }

    public attached() {
        document.body.classList.add("b10k-bg");
    }
    public detached() {
        document.body.classList.remove("b10k-bg");
    }
}
