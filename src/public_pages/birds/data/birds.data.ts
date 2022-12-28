import { Sample, ServerAPI } from "@scifeon/core";
import { autoinject } from "aurelia-framework";

@autoinject
export class BirdsData {
    constructor(private server: ServerAPI) { }

    /**
     * Get all taxonomy records from the TaxonomyItemOverview view.
     *
     * @returns promise of list of taxonomy records.
     */
    public async getTaxonomyRecords(): Promise<any[]> {
        const response = await this.server.datasetQuery(
            [
                {
                    view: "B10K_TaxonomyItemOverview",
                    collection: "records",
                },

            ],
        );

        return response.records;
    }

    public async fetchSamples(): Promise<Sample[]> {
        const result = await this.server.datasetQuery([{
            view: "B10K_AllSamples",
            collection: "samples",
            select: ["attributes"],
        }]);

        return result.samples;
    }
}
