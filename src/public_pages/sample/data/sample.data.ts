import { Sample, ServerAPI, TaxonomyItem } from "@scifeon/core";
import { autoinject } from "aurelia-framework";

@autoinject
export default class SampleData {
    constructor(private server: ServerAPI) {}

    /**
     * Get a Sample entity from the AllSamples view matching the given ID.
     *
     * @param id Sample ID to get.
     * @raise Error if Sample was not found.
     * @returns promise of Sample Entity.
     */
    public async getSampleFromView(id: string): Promise<Sample> {
        const response = await this.server.datasetQuery(
            [
                {
                    view: "B10K_AllSamples",
                    collection: "samples",
                    filters: [
                        {field: "id", value: id },
                    ],
                },
            ],
        );

        if (!response.samples.length) {
            throw new Error(`Sample with ID ${id} was not found on the server`);
        }

        return response.samples[0] as Sample;
    }

    /**
     * Get the TaxonomyItem from the AllTaxonomyItems view matching the given ID.
     *
     * @param id TaxonomyItem ID to get
     * @raise Error if TaxonomyItem was not found.
     * @returns promise of Taxonomy Entity.
     */
    public async getTaxonomyItem(id: string): Promise<TaxonomyItem> {
        const response = await this.server.datasetQuery(
            [
                {
                    view: "B10K_AllTaxonomyItems",
                    collection: "taxonomyItems",
                    filters: [
                        { field: "id", value: id },
                    ],
                },
            ],
        );

        if (!response.taxonomyItems.length) {
            throw new Error(`TaxonomyItem with ID ${id} was not found on the server`);
        }

        return response.taxonomyItems[0];
    }
}