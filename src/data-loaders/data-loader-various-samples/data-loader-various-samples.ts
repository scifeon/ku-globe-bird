import { Dataset, Entity, ObjectUtils } from "@scifeon/core";
import { DataLoaderPlugin, IDataLoaderContext, scifeonDataLoader } from "@scifeon/plugins";
import { autoinject } from "aurelia-framework";
import DataLoaderVariousSamplesDataAPI from "./data/data-loader-various-samples.data-api";
import DataLoaderVariousSamplesLogic from "./logic/data-loader-various-samples.logic";
import { LISTVIEW_CONFIG_MATCHED, LISTVIEW_CONFIG_UNMATCHED } from "./static/data-loader-various-samples.static";
import "./styles/data-loader-various-samples.scss";

/**
 * Data loader for reading an excel files with sample information and results
 * where the results should be added to resultSets belonging to requests
 * matching the samples.
 */
@scifeonDataLoader({
    name: "B10K Various Samples Lab reports",
    description: "Load `Various Samples Lab reports.xlsx`",
    match: context => context.fileInfos[0].filename.startsWith("Various Samples Lab reports"),
    rank: 1,
})
@autoinject
export class DataLoaderVariousSamples implements DataLoaderPlugin {
    public listViewConfigMatched = LISTVIEW_CONFIG_MATCHED;
    public listViewConfigUnMatched = LISTVIEW_CONFIG_UNMATCHED;

    public entities: Entity[] = [];
    public unmatched: Entity[] = [];

    private context: IDataLoaderContext;

    constructor(
        private data: DataLoaderVariousSamplesDataAPI,
        private logic: DataLoaderVariousSamplesLogic,
    ) { }

    public async readFiles() {
        const fileInfo = this.context.fileInfos[0];
        if (!fileInfo.wb.Sheets.Birds) throw new Error("Please, make sure that the file contains a Birds worksheet");
        const sheetBirds = fileInfo.wb.Sheets.Birds;
        const columnNames = ["Phase", "B10K ID"];
        const samples = await this.data.getEntities("Sample");
        const samplesBirds = this.data.getExcelSamples(sheetBirds, columnNames);
        const mergedSamples = ObjectUtils.mergeCollections(samples, samplesBirds, "name");
        const taxItems = await this.data.getEntities("TaxonomyItem");

        this.entities = this.logic.linkTaxAndSamples(taxItems, mergedSamples);
        this.unmatched = this.logic.compileUnmatched(taxItems, samplesBirds);
    }

    public getResult(): Dataset {
        return { entities: this.entities };
    }

    public entitiesView?(): string {
        return require("./data-loader-various-samples.html");
    }

    public async init(context: IDataLoaderContext) {
        this.context = context;
    }
}
