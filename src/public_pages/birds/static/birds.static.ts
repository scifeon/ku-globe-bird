import { DataType, Sort } from "@scifeon/core";
import { IListViewConfig } from "@scifeon/ui";

export const LIST_VIEW_CONFIG: IListViewConfig = {
    fields: [
        {
            accessor: "latinName",
            ui: { render: '<a href="/#/b10k/TaxonomyItem/${record.id}">${record.latinName}</a>' }
        },
        { accessor: "speciesEnglishName", label: "Common Name" },
        { accessor: "familyName", label: "Family" },
        { accessor: "genusName", label: "Genus" },
        { accessor: "speciesName", label: "Species" },
        { accessor: "sampleCount", type: DataType.INT },
        {
            accessor: "latestSampleName",
            label: "B10K ID",
            ui: { render: '<a href="/#/b10k/Sample/${record.latestSampleID}">${record.latestSampleName}</a>' },
        },
        { accessor: "latestStatusProgress", label: "Status", },
    ],
    filters: [],
    sorting: { field: "latinName", direction: Sort.ASC },
};
