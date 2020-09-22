import { DataType } from "@scifeon/core";
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
        { accessor: "Experiment" },
        { accessor: "tissueSample", type: DataType.BOOLEAN },
        { accessor: "libraryPrep", label: "Library Preparation", type: DataType.BOOLEAN },
        { accessor: "sequencing", label: "Sequencing", type: DataType.BOOLEAN },
        { accessor: "bioinformatics", label: "Bioinformatics", type: DataType.BOOLEAN },
        { accessor: "validation", label: "Validation", type: DataType.BOOLEAN },
    ],
};
