import { Sample } from "@scifeon/core";

export class BirdsLogic {
    /**
     * Compile stats for charting in the form of ApexChart data series.
     *
     * @param records Taxonomy records from TaxonomyItemOverview view.
     * @returns list of stats objects.
     */
    public compileStats(samples: Sample[]) {
        const stats = [];
        const counts = {
            statusCovered: 0,
            statusDna: 0,
            statusSequencing: 0,
            statusAssembly: 0,
        };

        const filtered = samples.filter(s => s.attributes?.b10kid);

        for (const sample of filtered) {

            if (this.isAttributeYes(sample, "statusCovered")) counts.statusCovered += 1;
            if (this.isAttributeYes(sample, "statusDna")) counts.statusDna += 1;
            if (this.isAttributeYes(sample, "statusSequencing")) counts.statusSequencing += 1;
            if (this.isAttributeYes(sample, "statusAssembly")) counts.statusAssembly += 1;
        }

        const keys = Object.keys(counts);

        for (const key of keys) {
            stats.push(
                { x: key, y: counts[key] },
            );
        }

        return stats;
    }

    // helpers

    private isAttributeYes(sample: Sample, prop: string) {
        if (!sample.attributes) return "";

        return sample.attributes[prop]?.toLowerCase()?.trim() === "yes";
    }
}