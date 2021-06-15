import { TaxonomyItem, Sample } from "@scifeon/core";

export default class StatsLogic {
    public compileStats(records: any[]) {
        const sampleMap: {[id: string]: Sample } = this.compileTaxIdToSampleMap(samples);

        console.log("sampleMap", sampleMap)
    }
}