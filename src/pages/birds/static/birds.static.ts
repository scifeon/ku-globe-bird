import { DatasetQuery } from "@scifeon/core";
import { IListViewConfig } from "@scifeon/ui";

export const LIST_VIEW_CONFIG: IListViewConfig = {
    fields: [
        { accessor: "latinName", ui: { render: '<a href="/#/entity/TaxonomyItem/${record.taxonomyItemID}">${record.latinName}</a>' } },
        { accessor: "commonName", label: "Common Name" },
        { accessor: "familyName", label: "Family" },
        { accessor: "genusName", label: "Genus" },
        { accessor: "speciesName", label: "Species" },
        { accessor: "subSpeciesName", label: "Sub Species" },
        { accessor: "experimentName", label: "Experiment", ui: { render: '<a href="/#/eln/${record.experimentID}">${record.experimentName}</a>' } },
        { accessor: "tissueSampleStatus" },
        { accessor: "libraryPreparationStatus", label: "Library Preparation" },
        { accessor: "sequencingStatus", label: "Sequencing" },
        { accessor: "bioinformaticsStatus", label: "Bioinformatics" },
        { accessor: "validationStatus", label: "Validation" },
    ],
};

export const DATASET_QUERIES: DatasetQuery[] = [
    {
        eClass: "TaxonomyItem",
        collection: "taxonomyItems",
    },
    {
        eClass: "Animal",
        collection: "animals",
        filters: [
            { field: "TaxonomyItemID", in: "taxonomyItems.id" },
        ],
    },
    {
        eClass: "Experiment",
        collection: "experiments",
    },
    {
        view: "StepSampleInput",
        collection: "inputSamples",
        filters: [
            { field: "inputPosition", value: 0 },
        ],
    },
    {
        eClass: "Step",
        collection: "steps",
        filters: [
            { field: "ID", in: "inputSamples.stepID" },
            { field: "ExperimentID", in: "experiments.id" },
        ],
    },
    {
        eClass: "Sample",
        collection: "samples",
        filters: [
            { field: "TaxonomyItemID", in: "taxonomyItems.id" },
        ],
    },
];
