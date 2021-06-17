import { ServerAPI, TaxonomyItem, Sample } from "@scifeon/core";
import { autoinject } from "aurelia-framework";

@autoinject
export default class TaxonomyItemData {
    constructor(private server: ServerAPI) {}

    /**
     * Get a TaxonomyItem entity from the AllTaxonomyItems view matching the
     * given ID.
     *
     * @param id TaxonomyItem ID to get.
     * @raise Error if TaxonomyItem was not found.
     * @returns promise of TaxonomyItem entity.
     */
    public async getTaxonomyItemFromView(id: string): Promise<TaxonomyItem> {
        const response = await this.server.datasetQuery(
            [
                {
                    view: "B10K_AllTaxonomyItems",
                    collection: "taxonomyItems",
                    filters: [{ field: "id", value: id }],
                },
            ],
        );

        if (!response.taxonomyItems.length) {
            throw new Error(`TaxonomyItem with ID ${id} was not found on server`);
        }

        return response.taxonomyItems[0] as TaxonomyItem;
    }

    public async getAllSamplesFromView(taxonomyItemID: string): Promise<Sample[]> {
        const response = await this.server.datasetQuery(
            [
                {
                    view: "B10K_AllSamples",
                    collection: "samples",
                    filters: [{ field: "taxonomyItemID", value: taxonomyItemID }],
                },
            ],
        );

        return response.samples as Sample[];
    }
}