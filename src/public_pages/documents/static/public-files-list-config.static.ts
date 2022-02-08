import { DataType } from "@scifeon/core";
import { IListViewConfig } from "@scifeon/ui";

export const PUBLIC_FILES_LIST_CONFIG: IListViewConfig = {
    fields: [
        {
            accessor: "name",
            ui: { render: '<a href="/api/file/public/${record.id}" title="Download file">${record.name} <i class="fa fa-download"></i></a>' },
        },
        {
            accessor: "createdDate",
            label: "Date",
            type: DataType.DATE,
        }
    ],
    maxHeight: 600,
    showDropDown: false,
}