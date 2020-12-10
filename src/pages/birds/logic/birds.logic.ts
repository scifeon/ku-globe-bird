import { Sample, TaxonomyItem } from "@scifeon/core";
export default class BirdsLogic {
    public compileRecords(taxItems: TaxonomyItem[], allSamples: Sample[]): any[] {
        const records = [];

        for (const taxItem of taxItems) {
            const samples = allSamples.filter(sample => sample.taxonomyItemID === taxItem.id)
            const sortedSamples = samples.sort((a, b) => a.modifiedUtc.valueOf() - b.modifiedUtc.valueOf());

            records.push(
                {
                    taxonomyItem: taxItem,
                    sampleCount: sortedSamples.length,
                    latestSample: sortedSamples[sortedSamples.length - 1],
                }
            );
        }

        return records;
    }
}