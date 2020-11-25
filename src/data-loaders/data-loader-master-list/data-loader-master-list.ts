
import { Dataset, Entity } from "@scifeon/core";
import { DataLoaderPlugin, IDataLoaderContext, scifeonDataLoader } from "@scifeon/plugins";
import { autoinject } from "aurelia-framework";
import { IListViewConfig } from "../../../../../../packages/ui/src/sci-list-view-interfaces";
import DataLoaderMasterListDataAPI from "./data/data-loader-master-list.data-api";
import DataLoaderMasterListLogic from "./logic/data-loader-master-list.logic";

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
        private logic: DataLoaderMasterListLogic,
    ) { }

    public async readFiles() {
        const fileInfo = this.context.fileInfos[0];
        const sheetAll = fileInfo.wb.Sheets["Report all"];
        const sheetSmithsonian = fileInfo.wb.Sheets["Report smithsonian"];
        const columnNames = ["NO", "Phase", "B10K ID"];
        const samplesAll = this.data.getSamplesAll(sheetAll, columnNames);
        const samplesSmithsonian = this.data.getSamplesAll(sheetSmithsonian, columnNames);
        const b10kIds = this.logic.compileUniqueB10KIds([...samplesAll, ...samplesSmithsonian]);
        const samples = await this.data.getSamplesByName(b10kIds);
        const merge1 = this.logic.mergeEntityCollections(samples, samplesAll);
        const merge2 = this.logic.mergeEntityCollections(merge1, samplesSmithsonian);

        // this.entities.push(...samplesAll, ...samplesSmithsonian);
        this.entities.push(...merge2);
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
