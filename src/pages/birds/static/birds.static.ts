import { IListViewConfig } from "@scifeon/ui";

export const LIST_VIEW_CONFIG: IListViewConfig = {
    fields: [
        { accessor: "latinName", ui: { render: '<a href="/#/entity/TaxonomyItem/${record.id}">${record.latinName}</a>' } },
        { accessor: "commonName", label: "Common Name" },
        { accessor: "familyName", label: "Family" },
        { accessor: "genusName", label: "Genus" },
        { accessor: "speciesName", label: "Species" },
        { accessor: "subSpeciesName", label: "Sub Species" },
        { accessor: "experimentName", label: "Experiment", ui: { render: '<a href="/#/eln/${record.experimentID}">${record.experimentName}</a>' } },
        { accessor: "tissueSampleStatus", label: "Tissue Sample", ui: { render: '<span class="overview color-${record.tissueSampleStatus}">${record.tissueSampleStatus}</span>'} },
        { accessor: "libraryPreparationStatus", label: "Library Preparation", ui: { render: '<span class="overview color-${record.libraryPreparationStatus}">${record.libraryPreparationStatus}</span>'} },
        { accessor: "sequencingStatus", label: "Sequencing", ui: { render: '<span class="overview color-${record.sequencingStatus}">${record.sequencingStatus}</span>'} },
        { accessor: "bioinformaticsStatus", label: "Bioinformatics", ui: { render: '<span class="overview color-${record.bioinformaticsStatus}">${record.bioinformaticsStatus}</span>'} },
        { accessor: "validationStatus", label: "Validation", ui: { render: '<span class="overview color-${record.validationStatus}">${record.validationStatus}</span>'} },
    ],
};
