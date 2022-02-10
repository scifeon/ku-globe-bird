import { PAGE_TYPE, scifeonRoute } from "@scifeon/plugins";
import { IListViewConfig } from "@scifeon/ui";
import { autoinject } from "aurelia-framework";
import { PUBLIC_FILES_LIST_CONFIG } from "./static/public-files-list-config.static";
import "./styles/documents.scss";

/**
 * Page for "documents".
 */
@autoinject
@scifeonRoute({ title: "Documents", route: "b10k/documents", type: PAGE_TYPE.PUBLIC })
export class B10KContact {
    public publicFilesListConfig: IListViewConfig = PUBLIC_FILES_LIST_CONFIG;

    public attached() {
        document.body.classList.add("b10k-bg");
    }
    public detached() {
        document.body.classList.remove("b10k-bg");
    }
}
