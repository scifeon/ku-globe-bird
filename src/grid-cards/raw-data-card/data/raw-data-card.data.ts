import { ServerAPI, Sample } from "@scifeon/core";
import { autoinject } from "aurelia-framework";
import { runInThisContext } from "vm";

@autoinject
export default class RawDataCardData {
    constructor(private server: ServerAPI) {}

    public async getSamples(taxonomyItemID: string): Promise<Sample[]> {
        const response = await this.server.datasetQuery(
            [
                {
                    eClass: "Sample",
                    collection: "samples",
                    filters: [{ field: "taxonomyItemID", value: taxonomyItemID }],
                },
            ],
        );

        return response.samples;
    }
}