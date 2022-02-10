import { ServerAPI } from "@scifeon/core";
import { autoinject } from "aurelia-framework";

@autoinject
export default class BirdsData {
    constructor(private server: ServerAPI) {}


    public async getTaxonomyRecords(): Promise<any[]> {
        const response = await this.server.datasetQuery(
            [
                {
                    view: "B10K_TaxonomyItemOverview",
                    collection: "records"
                }

            ]
        )

        return response.records;
    }
}
