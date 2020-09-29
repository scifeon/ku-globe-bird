import { Animal, Experiment, Sample, Step, TaxonomyItem } from "@scifeon/core";

/**
 * Interface for taxonomy records used to populate the birds table.
 */
export default interface ITaxonomyRecord  {
    /**
     * TaxonomyItem entity.
     */
    taxonomyItem?: TaxonomyItem;

    /**
     * Sample entity.
     */
    sample?: Sample;

    /**
     * Animal entity.
     */
    animal?: Animal;

    /**
     * The sample entity used as input in the first experiment step.
     */
    inputSample?: Sample;

    /**
     * The first input step entity.
     */
    inputStep?: Step;

    /**
     * Experiement entity.
     */
    experiment?: Experiment;

    /**
     * Flag indicating that the "Tissue Sample" step is completed or not.
     */
    tissueSample?: boolean;

    /**
     * Flag indicating that the "Library Preparation" step is completed or not.
     */
    libraryPrep?: boolean;

    /**
     * Flag indicating that the "Sequencing" step is completed or not.
     */
    sequencing?: boolean;

    /**
     * Flag indicating that the "Bioinformatics" step is completed or not.
     */
    bioinformatics?: boolean;

    /**
     * Flag indicating that the "Validation" step is completed or not.
     */
    validation?: boolean;
}
