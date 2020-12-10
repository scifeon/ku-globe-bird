import { Sample, TaxonomyItem } from "@scifeon/core";
export default class DataLoaderMasterListLogic {
    /**
     * Given a list of taxonomy items and a list of samples, cross map these and
     * add taxonomyItemId to samples where matched on latin name.
     *
     * @param taxItems List of TaxonomyItem entities.
     * @param samples  List of Sample entities.
     * @returns List of unmatched Sample entities.
     */
    public linkTaxAndSamples(taxItems: TaxonomyItem[], samples: Sample[]): Sample[] {
        const newSamples: Sample[] = [];

        for (const sample of samples) {
            const taxItem = taxItems.find(ti => ti.name === sample.attributes.speciesName);

            if (taxItem) {
                sample.taxonomyItemId = taxItem.id;
            }

            newSamples.push(sample);
        }

        return newSamples;
    }

    /**
     * Given a list of taxonomy items and a list of samples, cross map these to
     * compile a list of samples where the sample.attribute.speciesName is not
     * matched to the taxonomyItem.name.
     *
     * @private
     * @param taxItems List of TaxonomyItem entities.
     * @param samples List of Sample entities.
     * @returns List of unmatched Sample entities.
     */
    public compileUnmatched(taxItems: TaxonomyItem[], samples: Sample[]): Sample[] {
        const unmatched: Sample[] = [];

        for (const sample of samples) {
            const taxItem = taxItems.find(ti => ti.name === sample.attributes.speciesName);

            if (taxItem) continue;

            unmatched.push(sample);
        }

        return unmatched;
    }
}
