import { TaxonomyItem } from "@scifeon/core";
import { PanelContext, scifeonGridCard } from "@scifeon/plugins";
import { Dialog } from "@scifeon/ui";
import { autoinject } from "aurelia-framework";
import { ModalEditPicture } from "./modal-edit-picture/modal-edit-picture";
import "./styles/picture-card.scss";

@scifeonGridCard({
    id: "bird-picture",
    name: "Picture",
    match: context => {
        const entity = context.entity;

        if (!entity.id) return false;
        if (entity.eClass !== "TaxonomyItem") return false;

        return true;
    },
    size: {
        min: {
            width: 2,
            height: 2,
        },
        max: {
            width: 12,
            height: 6,
        },
        active: {
            width: 2,
            height: 2,
        },
    },
})
@autoinject
export class PictureCard {
    private taxonomyItem: TaxonomyItem;

    constructor(private dialog: Dialog) {}

    // Handlers.

    public clickEditPictureHandler() {
        this.dialog.open({
            viewModel: ModalEditPicture,
            model: {
                taxonomyItem: this.taxonomyItem,
            },
        }).whenClosed(result => {
            if (result.wasCancelled) return;

            console.log("LIGE HER");
        });
    }
    // life cycle hooks.

    /**
     * Check if the Animal-table includes a FK to the current entity class and
     * if so, load related animals.
     */
    public async init(context: PanelContext) {
        this.taxonomyItem = context.entity;
    }
}
