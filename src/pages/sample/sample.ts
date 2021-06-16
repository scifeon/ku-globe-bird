import { PAGE_TYPE, scifeonRoute } from "@scifeon/plugins";

/**
 * Public page displaying a B10K a Sample entity.
 */
@scifeonRoute({
    title: "Sample",
    route: "b10k/Sample/:id",
    type: PAGE_TYPE.PUBLIC,
    })
export class SamplePage {
    public async activate(params) {
        console.log("PARAMS", params)
    }
}
