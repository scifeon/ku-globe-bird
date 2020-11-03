import { DatasetQuery, DataType } from "@scifeon/core";
import { IListViewConfig } from "@scifeon/ui";

export const LIST_VIEW_CONFIG: IListViewConfig = {
    fields: [
        // { name: "TaxonomyItemID" },
        { accessor: "latinName" },
        { accessor: "commonName", label: "Common Name" },
        { accessor: "familyName", label: "Family" },
        { accessor: "genusName", label: "Genus" },
        { accessor: "speciesName", label: "Species" },
        { accessor: "subSpeciesName", label: "Sub Species" },
        // { accessor: "experiment.name", label: "Experiment", ui: { render: '<a href="/#/eln/${record.experiment.id}">${record.experiment.name}</a>' } },
        { accessor: "experimentName", label: "Experiment" },
        { accessor: "tissueSampleStatus" }, //, type: DataType.BOOLEAN },
        { accessor: "libraryPrep", label: "Library Preparation", type: DataType.BOOLEAN },
        { accessor: "sequencing", label: "Sequencing", type: DataType.BOOLEAN },
        { accessor: "bioinformatics", label: "Bioinformatics", type: DataType.BOOLEAN },
        { accessor: "validation", label: "Validation", type: DataType.BOOLEAN },
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
