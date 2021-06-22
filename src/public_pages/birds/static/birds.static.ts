import { IListViewConfig } from "@scifeon/ui";

export const LIST_VIEW_CONFIG: IListViewConfig = {
    // fields: [
    //     {
    //         accessor: "taxonomyItem.name", label: "Latin Name",
    //         ui: { render: '<a href="/#/entity/TaxonomyItem/${record.taxonomyItem.id}">${record.taxonomyItem.name}</a>' }
    //     },
    //     { accessor: "taxonomyItem.attributes.speciesEnglishName", label: "Common Name" },
    //     { accessor: "taxonomyItem.familyName", label: "Family" },
    //     { accessor: "taxonomyItem.genusName", label: "Genus" },
    //     { accessor: "taxonomyItem.speciesName", label: "Species" },
    //     { accessor: "sampleCount", type: DataType.INT },
    //     { accessor: "latestSample.name", label: "B10K ID", ui: { render: '<a href="/#/entity/Sample/${record.latestSample.id}">${record.latestSample.name}</a>' } },
    //     { accessor: "latestSample.attributes.sampleDataLevel", label: "Status" },
    // ],
    fields: [
        // {
        //     accessor: "record.latinName",
        //     ui: { render: '<a href="/#/entity/TaxonomyItem/${record.id}">${record.latinName}</a>' }
        // },
        // { accessor: "record.speciesEnglishName", label: "Common Name" },
        { accessor: "record.taxonomyItem.familyName", label: "Family" },
        // { accessor: "taxonomyItem.genusName", label: "Genus" },
        // { accessor: "record.speciesName", label: "Species" },
        // { accessor: "record.sampleCount", type: DataType.INT },
        // { accessor: "record.latestSampleName", label: "B10K ID", ui: { render: '<a href="/#/entity/Sample/${record.latestSample.id}">${record.latestSample.name}</a>' } },
        // { accessor: "record.latestSampleDataLevel", label: "Status" },
    ],
};
