import { Sample, ServerAPI, TaxonomyItem } from "@scifeon/core";
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

    /**
     * Get all Sample entities with a foreign key matching the given
     * TaxonomyItemID.
     *
     * @param taxonomyItemID TaxonomyItem ID.
     * @returns promise of list of Sample entities.
     */
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

    /**
     * Get latest picture file for a given TaxonomyItemID.
     *
     * @param taxonomyItemID TaxonomyItem ID.
     * @returns promise of File entity.
     */
    public async getPictureFileFromView(taxonomyItemID: string): Promise<File> {
        const response = await this.server.datasetQuery(
            [
                {
                    view: "B10K_AllTaxItemFiles",
                    collection: "files",
                    filters: [{ field: "subjectID", value: taxonomyItemID }],
                },
            ],
        );

        return response.files[0] as File
    }
}