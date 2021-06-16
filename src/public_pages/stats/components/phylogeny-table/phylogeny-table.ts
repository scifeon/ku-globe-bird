import { customElement } from "aurelia-framework";
import { IListViewConfig } from "@scifeon/ui";
import { PHYLOGENY_LIST_CONFIG } from "./static/phylogeny-list-config.static";

@customElement("phylogeny-table")
export class PhylogenyTable {
    public records: any[] = [];
    public listViewConfig: IListViewConfig = PHYLOGENY_LIST_CONFIG;
}