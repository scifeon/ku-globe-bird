import { Sample, TaxonomyItem } from "@scifeon/core";
import { PAGE_TYPE, scifeonRoute } from "@scifeon/plugins";
import { autoinject } from "aurelia-framework";
import "../common/styles/common.scss";
import TaxonomyItemData from "./data/taxonomy-item.data";

/**
 * Public page displaying a B10K a Sample entity.
 */
@scifeonRoute({
    title: "TaxonomyItem",
    route: "b10k/TaxonomyItem/:id",
    type: PAGE_TYPE.PUBLIC,
    })
@autoinject
export class TaxonomyItemPage {
    public taxonomyItem: TaxonomyItem;
    public samples: Sample[] = [];
    public pictureFile: File;



    constructor(
        private data: TaxonomyItemData,
    ) {}

    public async init(router) {
        const taxonomyItemID = router.params.id;
        this.taxonomyItem = await this.data.getTaxonomyItemFromView(taxonomyItemID);
        this.samples = await this.data.getAllSamplesFromView(taxonomyItemID);
        this.pictureFile = await this.data.getPictureFileFromView(taxonomyItemID);

        console.log("TAX ITEM", this.taxonomyItem)
        console.log("SAMPLES", this.samples)
        console.log("FILE", this.pictureFile)
    }
}
