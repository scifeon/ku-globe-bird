import { scifeonRoute } from "@scifeon/plugins";
import { IListViewConfig } from "@scifeon/ui";
import { LIST_VIEW_CONFIG } from "./static/birds.static";
import "./styles/birds.scss";

/**
 * Page for overview of the sequencing progress of bird genomes.
 */
@scifeonRoute({ title: "Birds", route: "b10k/birds" })
export class BirdsPage {
    public listViewConfig: IListViewConfig = LIST_VIEW_CONFIG;
}
