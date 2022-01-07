import { Sample, TaxonomyItem } from "@scifeon/core";
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
                    latestSample: sortedSamples.slice(-1)[0],
                }
            );
        }

        return records;
    }

    public compileStats(records: ITaxItemRecord[]) {
        const stats = [];
        const counts = {
            statusCovered: 0,
            statusDna: 0,
            statusSequencing: 0,
            statusAssembly: 0,
        };

        for (const record of records) {
            if (!record.latestSample) continue;

            const sample = record.latestSample;

            if (sample.attributes.statusAssembly === "Yes") counts.statusAssembly += 1;
            if (sample.attributes.statusCovered === "Yes") counts.statusCovered += 1;
            if (sample.attributes.statusDna === "Yes") counts.statusDna += 1;
            if (sample.attributes.statusSequencing === "Yes") counts.statusSequencing += 1;
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