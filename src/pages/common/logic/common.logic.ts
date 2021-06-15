import { TaxonomyItem, Sample } from "@scifeon/core";
import ITaxItemRecord from "../interfaces/tax-item-record.interface";

export default class CommonLogic {
    /**
     * Compile a list of records for displaying the overview table and for
     * calculating stats.
     *
     * @param taxItems list of all TaxonomyItem entities.
     * @param samples list of Sample entities.
     * @returns list of records.
     */
    public compileRecords(taxItems: TaxonomyItem[], samples: Sample[]): ITaxItemRecord[] {
        const records = [];

        for (const taxItem of taxItems) {
            const subSamples = samples.filter(sample => sample.taxonomyItemID === taxItem.id)
            const sortedSamples = subSamples.sort((a, b) => a.modifiedUtc.valueOf() - b.modifiedUtc.valueOf());

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