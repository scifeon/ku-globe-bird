import { ServerAPI, TaxonomyItem, File } from "@scifeon/core";
import { autoinject } from "aurelia-framework";
import { Base64 } from "js-base64";

@autoinject
export default class PictureCardData {
    constructor(private server: ServerAPI) {}

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

    public async saveImageFile(oldFile: File, newFile: File) {
        oldFile.filename = newFile.filename;
        oldFile.content = newFile.content;
        oldFile.mediaType = newFile.mediaType;

        await this.server.save(oldFile);
    }
}