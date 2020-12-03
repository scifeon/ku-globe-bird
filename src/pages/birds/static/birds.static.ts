import { IListViewConfig } from "@scifeon/ui";

export const LIST_VIEW_CONFIG: IListViewConfig = {
    fields: [
        { accessor: "latinName", ui: { render: '<a href="/#/entity/TaxonomyItem/${record.id}">${record.latinName}</a>' } },
        { accessor: "commonName", label: "Common Name" },
        { accessor: "familyName", label: "Family" },
        { accessor: "genusName", label: "Genus" },
        { accessor: "speciesName", label: "Species" },
        { accessor: "experimentName", label: "Experiment", ui: { render: '<a href="/#/eln/${record.experimentID}">${record.experimentName}</a>' } },
        { accessor: "extractionStatus", label: "DNA Extraction", ui: { render: '<span class="overview color-${record.extractionStatus}">${record.extractionStatus}</span>'} },
        { accessor: "qualityTestingStatus", label: "DNA Quality Testing", ui: { render: '<span class="overview color-${record.qualityTestingStatus}">${record.qualityTestingStatus}</span>'} },
        { accessor: "libraryPreparationStatus", label: "Library Preparation", ui: { render: '<span class="overview color-${record.libraryPreparationStatus}">${record.libraryPreparationStatus}</span>'} },
        { accessor: "sequencingStatus", label: "Sequencing", ui: { render: '<span class="overview color-${record.sequencingStatus}">${record.sequencingStatus}</span>'} },
        { accessor: "genomeAssemblyStatus", label: "Genome Assembly", ui: { render: '<span class="overview color-${record.genomeAssemblyStatus}">${record.genomeAssemblyStatus}</span>'} },
        { accessor: "genomeQualificationStatus", label: "Genome Qualification", ui: { render: '<span class="overview color-${record.genomeQualificationStatus}">${record.genomeQualificationStatus}</span>'} },
    ],
};
