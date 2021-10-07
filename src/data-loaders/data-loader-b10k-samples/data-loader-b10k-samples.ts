import { Dataset, Entity, ObjectUtils } from "@scifeon/core";
import { DataLoaderPlugin, IDataLoaderContext, scifeonDataLoader } from "@scifeon/plugins";
import { autoinject } from "aurelia-framework";
import DataLoaderB10KSamplesLogic from "../data-loader-various-samples/logic/data-loader-various-samples.logic";
import DataLoaderB10KSamplesData from "./data/data-loader-b10k-samples.data";
import { LISTVIEW_CONFIG_MATCHED, LISTVIEW_CONFIG_UNMATCHED } from "./static/data-loader-b10k-samples.static";
import "./styles/data-loader-b10k-samples.scss";

/**
 * Data loader for reading an Excel files with B10K Sample to be linked with
 * TaxonomyItems on Latin name.
 *
 * This data loader is a replacement of the deprecated data-loader-master list.
 */
@scifeonDataLoader({
    name: "B10K Samples",
    description: "Load `B10K Samples.xlsx`",
    match: context => context.fileInfos[0].filename.startsWith("B10K Samples"),
    rank: 1,
})
@autoinject
export class DataLoaderB10KSamples implements DataLoaderPlugin {
    public listViewConfigMatched = LISTVIEW_CONFIG_MATCHED;
    public listViewConfigUnMatched = LISTVIEW_CONFIG_UNMATCHED;

    public entities: Entity[] = [];
    public unmatched: Entity[] = [];

    private context: IDataLoaderContext;

    constructor(
        private data: DataLoaderB10KSamplesData,
        private logic: DataLoaderB10KSamplesLogic,
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
        return require("./data-loader-b10k-samples.html");
    }

    public async init(context: IDataLoaderContext) {
        this.context = context;
    }
}
