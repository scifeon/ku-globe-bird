import { DataModel } from "@scifeon/core";
import { PLUGIN_TYPE, scifeonPlugin } from "@scifeon/plugins";

@scifeonPlugin({
    type: PLUGIN_TYPE.BOOTSTRAPPER,
})
export class B10KPatchDatamodel {
    constructor(
        private datamodel: DataModel,
    ) { }

    /**
     * Setting Sample name and attributes.status labels.
     */
    private patchSample() {
        const sampleTable = this.datamodel.findTable("Sample");

        const nameField = sampleTable.fields.find(f => f.accessor === "name");

        nameField.label = "B10K ID";

        const statusField = sampleTable.fields.find(f => f.accessor === "attributes.status");

        if (!statusField) return;

        statusField.label = "Status";
    }

    public async init() {
        this.patchSample();
    }
}
