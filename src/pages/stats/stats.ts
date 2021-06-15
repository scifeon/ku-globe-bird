import { scifeonRoute } from "@scifeon/plugins";
import { IListViewConfig } from "@scifeon/ui";
import { autoinject } from "aurelia-framework";

/**
 * Page for aggregated statistics of B10K progress.
 */
@autoinject
@scifeonRoute({ title: "Birds", route: "b10k/stats" })
export class BirdsPage {

    public data = [
                    {
                        x: 'Fisk',
                        y: 44
                    },
                    {
                        x: 'Fugl',
                        y: 36
                    },
                    {
                        x: 'Hammer',
                        y: 16
                    },
                    {
                        x: 'Ost',
                        y: 96
                    },
                ];
}
