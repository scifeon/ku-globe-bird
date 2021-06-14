import { scifeonRoute } from "@scifeon/plugins";
import { IListViewConfig } from "@scifeon/ui";
import { autoinject } from "aurelia-framework";

/**
 * Page for "contact us".
 */
@autoinject
@scifeonRoute({ title: "Contact Us", route: "b10k/contact" })
export class B10KContact {
}
