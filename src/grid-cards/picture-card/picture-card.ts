import { File, TaxonomyItem, ServerAPI } from "@scifeon/core";
import { PanelContext, scifeonGridCard } from "@scifeon/plugins";
import { Dialog } from "@scifeon/ui";
import { autoinject } from "aurelia-framework";
import PictureCardData from "./data/picture-card.data";
import { ModalEditPicture } from "./modal-edit-picture/modal-edit-picture";
import "./styles/picture-card.scss";

/**
 * Grid card for showing the picture of a bird. Per default a default image is
 * displayed, but this can be updated by uploading a new picture.
 */
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
    private imageFile: File;

    constructor(
        private dialog: Dialog,
        private data: PictureCardData,
    ) {}

    // Handlers.

    /**
     * Event handler for the clicking of the Update Picture button.
     */
    public clickEditPictureHandler() {
        this.dialog.open({
            viewModel: ModalEditPicture,
            model: {
                taxonomyItem: this.taxonomyItem,
            },
        }).whenClosed(result => {
            if (result.wasCancelled) return;

            const file = result.output.file;

            this.imageFile = file;

            this.data.saveImageFile(file);
        });
    }

    // Life cycle hooks.

    public async init(context: PanelContext) {
        this.taxonomyItem = context.entity;

        const imageFiles = await this.data.getImageFiles(this.taxonomyItem);

        this.imageFile = imageFiles.slice(-1)[0];
    }
}
