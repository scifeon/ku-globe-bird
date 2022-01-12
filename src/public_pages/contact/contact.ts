import { PAGE_TYPE, scifeonRoute } from "@scifeon/plugins";
import { autoinject } from "aurelia-framework";

/**
 * Page for "contact us".
 */
@autoinject
@scifeonRoute({ title: "Contact Us", route: "b10k/contact", type: PAGE_TYPE.PUBLIC })
export class B10KContact {
    public attached() {
        document.body.classList.add("b10k-bg");
    }
    public detached() {
        document.body.classList.remove("b10k-bg");
    }
}
