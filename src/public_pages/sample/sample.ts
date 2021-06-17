import { Sample } from "@scifeon/core";
import { PAGE_TYPE, scifeonRoute } from "@scifeon/plugins";
import { autoinject } from "aurelia-framework";
import SampleData from "./data/sample.data";
import "./styles/sample.scss";

/**
 * Public page displaying a B10K a Sample entity.
 */
@scifeonRoute({
    title: "Sample",
    route: "b10k/Sample/:id",
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
}
