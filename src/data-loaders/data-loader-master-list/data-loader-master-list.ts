import { Dataset, Entity, ObjectUtils } from "@scifeon/core";
import { DataLoaderPlugin, IDataLoaderContext, scifeonDataLoader } from "@scifeon/plugins";
import { IListViewConfig } from "@scifeon/ui";
import { autoinject } from "aurelia-framework";
import DataLoaderMasterListDataAPI from "./data/data-loader-master-list.data-api";

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
    public listViewConfig: IListViewConfig = {
        fields: [
            { accessor: "name", label: "B10K ID" },
            { accessor: "description" },
        ],
    };

    public entities: Entity[] = [];

    private context: IDataLoaderContext;

    constructor(
        private data: DataLoaderMasterListDataAPI,
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

        for (const sample of merge2) {
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
        return require("./data-loader-master-list.html");
    }

    public async init(context: IDataLoaderContext) {
        this.context = context;
    }
}
