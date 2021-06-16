import { scifeonRoute } from "@scifeon/plugins";
import { autoinject } from "aurelia-framework";
import "./styles/contact.scss";

/**
 * Page for "contact us".
 */
@autoinject
@scifeonRoute({ title: "Contact Us", route: "b10k/contact" })
export class B10KContact {
}
