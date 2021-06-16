import { PAGE_TYPE, scifeonRoute } from "@scifeon/plugins";
import { autoinject } from "aurelia-framework";
import { Sample, ServerAPI } from "@scifeon/core";

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

    constructor(private server: ServerAPI) {}

    public async init(params) {
        const sampleID = params.params.id;
        console.log(sampleID)
        const response = await this.server.get(`/api/Sample/${sampleID}`)
        console.log(response)
    }
}
