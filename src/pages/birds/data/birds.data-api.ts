import { Entity, ServerAPI } from "@scifeon/core";
import { autoinject } from "aurelia-framework";

@autoinject
export default class BirdsDataAPI {
    constructor(private server: ServerAPI) {}

    public getRecords(): Promise<any[]> {
        const records = this.getTaxonomyItems();

        return records;
    }

    private async getTaxonomyItems(): Promise<Entity[]> {
        const ds = await this.server.datasetQuery([
            { eClass: "TaxonomyItem", collection: "taxonomyItems" },
        ]);
        console.log("BirdsDataAPI -> constructor -> ds", ds)

        return ds.taxonomyItems;
    }
}
