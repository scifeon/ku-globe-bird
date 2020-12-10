import { Dataset, Entity, ObjectUtils } from "@scifeon/core";
import { DataLoaderPlugin, IDataLoaderContext, scifeonDataLoader } from "@scifeon/plugins";
import { IListViewConfig } from "@scifeon/ui";
import { autoinject } from "aurelia-framework";
import DataLoaderVariousSamplesDataAPI from "./data/data-loader-various-samples.data-api";

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
    public listViewConfig: IListViewConfig = {
        fields: [
            { accessor: "name", label: "B10K ID" },
            { accessor: "description" },
        ],
    };

    public entities: Entity[] = [];

    private context: IDataLoaderContext;

    constructor(
        private data: DataLoaderVariousSamplesDataAPI,
    ) { }

    public async readFiles() {
        const fileInfo = this.context.fileInfos[0];
        const sheetArk1 = fileInfo.wb.Sheets.Ark1;
        const columnNames = ["Phase", "B10K ID", "BGI-ID"];
        const samples = await this.data.getEntities("Sample");
        const samplesArk1 = this.data.getExcelSamples(sheetArk1, columnNames);

        const mergedSamples = ObjectUtils.mergeCollections(samples, samplesArk1, "name");

        const taxItems = await this.data.getEntities("TaxonomyItem");

        for (const sample of mergedSamples) {
            const taxItem = taxItems.find(ti => ti.name === sample.attributes.speciesName);

            if (taxItem) {
                sample.taxonomyItemId = taxItem.id;
            } else {
                console.log("Could not link: ", sample.attributes.speciesName);
            }

            this.entities.push(sample);
        }
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
