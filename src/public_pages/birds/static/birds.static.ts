import { DataType } from "@scifeon/core";
import { IListViewConfig } from "@scifeon/ui";

export const LIST_VIEW_CONFIG: IListViewConfig = {
    fields: [
        {
            accessor: "latinName",
            ui: { render: '<a href="/#/entity/TaxonomyItem/${record.id}">${record.latinName}</a>' }
        },
        { accessor: "speciesEnglishName", label: "Common Name" },
        { accessor: "familyName", label: "Family" },
        { accessor: "genusName", label: "Genus" },
        { accessor: "speciesName", label: "Species" },
        { accessor: "sampleCount", type: DataType.INT },
        { accessor: "latestSampleName", label: "B10K ID", ui: { render: '<a href="/#/entity/Sample/${record.latestSampleID}">${record.latestSampleName}</a>' } },
        { accessor: "latestStatusProgress", label: "Status", },
    ],
    filters: [],
};
