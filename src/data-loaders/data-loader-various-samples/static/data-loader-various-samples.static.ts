import { IListViewConfig } from "@scifeon/ui";

export const LISTVIEW_CONFIG_MATCHED: IListViewConfig = {
    fields: [
        { accessor: "name", label: "B10K ID" },
        { accessor: "description", label: "Latin name" },
    ],
    height: 200,
};

export const LISTVIEW_CONFIG_UNMATCHED: IListViewConfig = {
    fields: [
        { accessor: "name", label: "B10K ID" },
        { accessor: "description", label: "Latin name" },
    ],
    height: 200,
};
