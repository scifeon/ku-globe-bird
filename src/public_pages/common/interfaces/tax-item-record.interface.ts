import { Sample, TaxonomyItem } from "@scifeon/core";
export default interface ITaxItemRecord {
    /**
     * TaxonomyItem entity.
     */
    taxonomyItem: TaxonomyItem,

    /**
     * Number of samples linked to the taxonomyItem.
     */
    sampleCount: number,

    /**
     * The latest sample linked to the taxonomyItem.
     */
    latestSample: Sample,
}
