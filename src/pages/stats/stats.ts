import { scifeonRoute } from "@scifeon/plugins";
import { IListViewConfig } from "@scifeon/ui";
import { autoinject } from "aurelia-framework";

/**
 * Page for aggregated statistics of B10K progress.
 */
@autoinject
@scifeonRoute({ title: "Birds", route: "b10k/stats" })
export class BirdsPage {
}
