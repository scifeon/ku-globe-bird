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
        const sheet = fileInfo.wb.Sheets["Samples"];
        const columnNames = ["Species name"];
        const oldSamples = await this.data.getEntities("Sample");
        const newSamples = this.data.getExcelSamples(sheet, columnNames);
        const merge = ObjectUtils.mergeCollections(oldSamples, newSamples, "name");
        const taxItems = await this.data.getEntities("TaxonomyItem");

        console.log({ oldSamples, newSamples, merge, taxItems });

        this.entities = this.logic.linkTaxAndSamples(taxItems, merge);
        this.unmatched = [
            ...this.logic.compileUnmatched(taxItems, newSamples),
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
