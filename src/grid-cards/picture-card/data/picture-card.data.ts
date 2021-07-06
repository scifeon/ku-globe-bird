import { File, ServerAPI, TaxonomyItem } from "@scifeon/core";
import { autoinject } from "aurelia-framework";

@autoinject
export default class PictureCardData {
    constructor(private server: ServerAPI) {}

    /**
     * Get all image files with subject ID matching the given taxonomy item.
     *
     * @param taxonomyItem Taxonomy Item entity.
     * @returns promise of File entities.
     */
    public async getImageFiles(taxonomyItem: TaxonomyItem): Promise<File> {
        const response = await this.server.datasetQuery(
            [
                {
                    eClass: "File",
                    collection: "files",
                    filters: [
                        {
                            field: "subjectID", value: taxonomyItem.id,
                        }
                    ],
                },
            ]
        );

        return response.files;
    }

    /**
     * Save the given file to the server.
     *
     * @param file File entity
     */
    public async saveImageFile(file: File) {
        await this.server.save(file);
    }
}