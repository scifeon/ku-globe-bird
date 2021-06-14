import { TaxonomyItem, File } from "@scifeon/core";
export default class PictureCardLogic {
    public compileImageFile(taxonomyItem: TaxonomyItem): File {
        return (
            {
                eClass: "File",
                subjectID: taxonomyItem.id,
                subjectClass: taxonomyItem.eClass,
            }
        );
    }
}