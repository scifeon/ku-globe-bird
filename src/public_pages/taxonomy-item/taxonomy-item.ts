import { Sample, ScifeonUser, TaxonomyItem } from "@scifeon/core";
import { PAGE_TYPE, scifeonRoute } from "@scifeon/plugins";
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
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
        private user: ScifeonUser,
        private router: Router,
    ) {}

    public async init(router) {
        const taxonomyItemID = router.params.id;

        if (this.user.isLoggedIn) {
            this.router.navigate(`/entity/TaxonomyItem/${taxonomyItemID}`);
        }

        this.taxonomyItem = await this.data.getTaxonomyItemFromView(taxonomyItemID);
        this.samples = await this.data.getAllSamplesFromView(taxonomyItemID);
        this.pictureFile = await this.data.getPictureFileFromView(taxonomyItemID);
    }

    public attached() {
        document.body.classList.add("b10k-bg");
    }
    public detached() {
        document.body.classList.remove("b10k-bg");
    }
}
