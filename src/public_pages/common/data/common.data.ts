import { Sample, ServerAPI, TaxonomyItem } from "@scifeon/core";
import { autoinject } from "aurelia-framework";

@autoinject
export default class CommonData {
    constructor(private server: ServerAPI) {}

    /**
     * Get all Sample entities from the server.
     *
     * @returns promise of list of Sample entities.
     */
    public async getAllSamples(): Promise<Sample[]> {
        const response = await this.server.datasetQuery(
            [
                {
                    eClass: "Sample",
                    collection: "samples",
                }
            ],
        );

        return response.samples;
    }

    /**
     * Get all TaxonomyItem entities from the server.
     *
     * @returns promise of list of TaxonomyItem entities.
     */
    public async getAllTaxonomyItems(): Promise<TaxonomyItem[]> {
        const response = await this.server.datasetQuery(
            [
                {
                    eClass: "TaxonomyItem",
                    collection: "taxItems",
                }
            ],
        );

        return response.taxItems;
    }

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
