import { ServerAPI, Status, Step } from "@scifeon/core";
import { autoinject } from "aurelia-framework";
import ITaxonomyRecord from "../interfaces/taxonomy-record.interface";
import { DATASET_QUERIES } from "../static/birds.static";

@autoinject
export default class BirdsDataAPI {
    constructor(private server: ServerAPI) {}

    /**
     * Get all records for displaying in the birds overview.
     */
    public async getRecords(): Promise<ITaxonomyRecord[]> {
        const ds = await this.server.datasetQuery(DATASET_QUERIES);

        console.log("BirdsDataAPI -> constructor -> ds", ds)

        const records: ITaxonomyRecord[] = [];

        for (const taxonomyItem of ds.taxonomyItems) {
            const record: any = {};

            record.taxonomyItem = taxonomyItem;
            record.sample = ds.samples.find(s => s.taxonomyItemID === record.taxonomyItem.id),
            record.animal = ds.animals.find(s => s.taxonomyItemID === record.taxonomyItem.id);
            record.inputSample = ds.inputSamples.find(s => s.animalID === record.animal.id);
            record.inputStep = ds.steps.find(s => s.id === record.inputSample?.stepID);
            record.experiment = ds.experiments.find(e => e.id === record.inputStep?.experimentID);

            this.setStatus(ds.steps, record);
            this.compileLatinName(record);

            records.push(record);
        }

        return records;
    }

    private setStatus(allSteps: Step[], record: ITaxonomyRecord) {
        const steps = allSteps.filter(s => s.experimentID === record.experiment?.id);

        if (steps.length) {
            record.tissueSample = this.isStepCompleted(steps, "Tissue Sample");
            record.libraryPrep = this.isStepCompleted(steps, "Library Preparation");
            record.sequencing = this.isStepCompleted(steps, "Sequencing");
            record.bioinformatics = this.isStepCompleted(steps, "Bioinformatics");
            record.validation = this.isStepCompleted(steps, "Validation");
        }
    }

    private isStepCompleted(steps: Step[], stepName: string): boolean {
        const step = steps.find(s => s.name === stepName);

        return step.status === Status.COMPLETED;
    }

    private compileLatinName(record: ITaxonomyRecord): string {
        return record.taxonomyItem.latinName = [
            record.taxonomyItem.genusName,
            record.taxonomyItem.speciesName,
            record.taxonomyItem.subSpeciesName,
        ].join(" ");
    }
}
