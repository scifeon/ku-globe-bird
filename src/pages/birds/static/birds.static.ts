import { IListViewConfig } from "@scifeon/ui";

export const LIST_VIEW_CONFIG: IListViewConfig = {
    fields: [
        { accessor: "description", label: "Common Name" },
        { accessor: "orderName", label: "Order" },
        { accessor: "familyName", label: "Family" },
        { accessor: "genusName", label: "Genus" },
        { accessor: "speciesName", label: "Species" },
        { accessor: "subSpeciesName", label: "Sub Species" },
        { accessor: "latinName", label: "Latin Name" },
    ],
};
