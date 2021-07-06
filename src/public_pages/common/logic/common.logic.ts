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

    public compileStats(records: ITaxItemRecord[]) {
        const stats = [];
        const counts = {};

        for (const record of records) {
            if (!record.latestSample) continue;

            const status = record.latestSample.attributes.sampleDataLevel;

            if (!status) continue;

            if (!counts[status]) {
                counts[status] = 1;
            } else {
                counts[status] += 1;
            }
        }

        const keys = Object.keys(counts)

        for (const key of keys) {
            stats.push(
                { x: key, y: counts[key] },
            );
        }


        return stats;
    }
}