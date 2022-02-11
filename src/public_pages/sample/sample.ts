import { Sample, ScifeonUser, TaxonomyItem } from "@scifeon/core";
import { PAGE_TYPE, scifeonRoute } from "@scifeon/plugins";
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import "../common/styles/common.scss";
import SampleData from "./data/sample.data";

/**
 * Public page displaying a B10K a Sample entity.
 */
@scifeonRoute({
    title: "Sample",
    route: "b10k/sample/:id",
    type: PAGE_TYPE.PUBLIC,
    })
@autoinject
export class SamplePage {
    public sample: Sample;
    public taxonomyItem: TaxonomyItem;
    public url: string;

    constructor(
        private data: SampleData,
        private user: ScifeonUser,
        private router: Router,
    ) {}

    public async init(router) {
        const sampleID = router.params.id;

        if (this.user.isLoggedIn) {
            this.router.navigate(`/entity/Sample/${sampleID}`);
        }

        this.sample = await this.data.getSampleFromView(sampleID);
        this.taxonomyItem = await this.data.getTaxonomyItem(this.sample.taxonomyItemID);

        console.log(this.taxonomyItem)
        this.url = `https://sid.erda.dk/cgi-sid/ls.py?share_id=EPIKbljMg4;current_dir=data/${this.sample.name};flags=f`;
    }

    public attached() {
        document.body.classList.add("b10k-bg");
    }
    public detached() {
        document.body.classList.remove("b10k-bg");
    }
}
