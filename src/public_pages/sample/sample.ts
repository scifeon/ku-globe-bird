import { Sample, ScifeonUser } from "@scifeon/core";
import { PAGE_TYPE, scifeonRoute } from "@scifeon/plugins";
import { autoinject } from "aurelia-framework";
import "../common/styles/common.scss";
import SampleData from "./data/sample.data";
import { Router } from "aurelia-router";

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
    }

    public attached() {
        document.body.classList.add("b10k-bg");
    }
    public detached() {
        document.body.classList.remove("b10k-bg");
    }
}
