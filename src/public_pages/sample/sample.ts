import { Sample } from "@scifeon/core";
import { PAGE_TYPE, scifeonRoute } from "@scifeon/plugins";
import { autoinject } from "aurelia-framework";
import "../common/styles/common.scss";
import SampleData from "./data/sample.data";

/**
 * Public page displaying a B10K a Sample entity.
 */
@scifeonRoute({
    title: "Sample",
    route: "entity/sample/:id",
    type: PAGE_TYPE.PUBLIC,
    })
@autoinject
export class SamplePage {
    public sample: Sample;

    constructor(
        private data: SampleData,
    ) {}

    public async init(router) {
        const sampleID = router.params.id;
        this.sample = await this.data.getSampleFromView(sampleID);

        console.log("SAMPLE", this.sample)
    }

    public attached() {
        document.body.classList.add("b10k-bg");
    }
    public detached() {
        document.body.classList.remove("b10k-bg");
    }
}
