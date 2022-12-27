import { AlertManager, File, TaxonomyItem } from "@scifeon/core";
import { IDialogPlugin } from "@scifeon/plugins";
import { Dialog } from "@scifeon/ui";
import { autoinject } from "aurelia-framework";
import { ModalEditSamplesDataAPI } from "./data/modal-edit-picture.data";

/**
 * Modal with dialog for uploading a new bird picture.
 */
@Dialog.template(require("./modal-edit-picture.html"))
@autoinject
export class ModalEditPicture implements IDialogPlugin {
    public taxonomyItem: TaxonomyItem;

    private file: File;

    constructor(
        private dialog: Dialog,
        private alertManager: AlertManager,
        private data: ModalEditSamplesDataAPI,
    ) { }

    /**
     * @return image data to preview after selection of picture in the dropzone.
     */
    public get imageData(): string {
        if (!this.file) return;

        return `data:image/jpeg;base64, ${this.file.content}`;
    }

    // Handlers.

    /**
     * Event handler for files dropped in the dropzone.
     *
     * @param event Drop event.
     * @raise userError if format not PNG or JPG.
     */
    public async dropFilesHandler(event: CustomEvent) {
        const file = event.detail.files[0];

        if (!["image/jpeg", "image/png"].includes(file.type)) {
            this.alertManager.userError(
                {
                    text: "Bad file format",
                    description: "Only PNG or JPG picture formats accepted, please try again.",
                },
            );

            return;
        }

        this.file = {
            eClass: "File",
            content: await this.data.loadImageFile(file),
            filename: file.name,
            name: this.taxonomyItem.name,
            type: "BirdImage",
            subjectClass: this.taxonomyItem.eClass,
            subjectID: this.taxonomyItem.id,
            mediaType: file.type || "text/plain",
            size: file.size,
        };
    }

    /**
     * Event handler for clicking the Save button in the upload file dialog.
     */
    public async clickUpdateHandler() {
        this.dialog.ok({
            file: this.file,
        });
    }

    // life cycle hooks.

    public init(model) {
        this.taxonomyItem = model.taxonomyItem;
    }
}
