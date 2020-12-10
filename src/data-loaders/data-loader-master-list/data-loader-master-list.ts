import { Dataset, Entity, ObjectUtils } from "@scifeon/core";
import { DataLoaderPlugin, IDataLoaderContext, scifeonDataLoader } from "@scifeon/plugins";
import { autoinject } from "aurelia-framework";
import DataLoaderVariousSamplesLogic from "../data-loader-various-samples/logic/data-loader-various-samples.logic";
import DataLoaderMasterListDataAPI from "./data/data-loader-master-list.data-api";
import { LISTVIEW_CONFIG_MATCHED, LISTVIEW_CONFIG_UNMATCHED } from "./static/data-loader-master-list.static";
import "./styles/data-loader-master-list.scss";

/**
 * Data loader for reading an excel files with sample information and results
 * where the results should be added to resultSets belonging to requests
 * matching the samples.
 */
@scifeonDataLoader({
    name: "B10K Master List",
    description: "Load `Master List of Sample_of_B10K_genus.xlsx`",
    match: context => context.fileInfos[0].filename.startsWith("Master List of Sample_of_B10K_genus"),
    rank: 1,
})
@autoinject
export class DataLoaderMasterList implements DataLoaderPlugin {
    public listViewConfigMatched = LISTVIEW_CONFIG_MATCHED;
    public listViewConfigUnMatched = LISTVIEW_CONFIG_UNMATCHED;

    public entities: Entity[] = [];
    public unmatched: Entity[] = [];

    private context: IDataLoaderContext;

    constructor(
        private data: DataLoaderMasterListDataAPI,
        private logic: DataLoaderVariousSamplesLogic,
    ) { }

    public async readFiles() {
        const fileInfo = this.context.fileInfos[0];
        const sheetAll = fileInfo.wb.Sheets["Report all"];
        const sheetSmithsonian = fileInfo.wb.Sheets["Report smithsonian"];
        const columnNames = ["NO", "Phase", "B10K ID"];
        const samples = await this.data.getEntities("Sample");
        const samplesReportAll = this.data.getExcelSamples(sheetAll, columnNames);
        const samplesReportSmithsonian = this.data.getExcelSamples(sheetSmithsonian, columnNames);

        const merge1 = ObjectUtils.mergeCollections(samples, samplesReportAll, "name");
        const merge2 = ObjectUtils.mergeCollections(merge1, samplesReportSmithsonian, "name");

        const taxItems = await this.data.getEntities("TaxonomyItem");

        this.entities = this.logic.linkTaxAndSamples(taxItems, merge2);
        this.unmatched = [
            ...this.logic.compileUnmatched(taxItems, samplesReportAll),
            ...this.logic.compileUnmatched(taxItems, samplesReportSmithsonian),
        ];
    }

    public getResult(): Dataset {
        return { entities: this.entities };
    }

    public entitiesView?(): string {
        return require("./data-loader-master-list.html");
    }

    public async init(context: IDataLoaderContext) {
        this.context = context;
    }
}
