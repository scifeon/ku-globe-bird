import { AlertManager, File, TaxonomyItem } from "@scifeon/core";
import { IDialogPlugin } from "@scifeon/plugins";
import { Dialog } from "@scifeon/ui";
import { autoinject } from "aurelia-framework";
import { Base64 } from "js-base64";
import ModalEditSamplesDataAPI from "./data/modal-edit-picture.data";

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

    public get imageData(): string {
        if (!this.file) return;

        return "data:image/jpeg;base64, " + this.file.content;
    }

    // Handlers.

    public async dropFilesHandler(event: CustomEvent) {
        const file = event.detail.files[0];

        if (!["image/jpeg", "image/png"].includes(file.type)) {
            this.alertManager.userError(
                {
                    text: "Bad file format",
                    description: "Only PNG or JPG picture formats accepted, please try again.",
                }
            )

            return;
        }

        this.file = {
            eClass: "File",
            content: await this.data.loadImageFile(file),
            filename: file.name,
            subjectClass: null,
            subjectID: null,
            mediaType: file.type || "text/plain",
            size: file.size,
        };

        console.log("ASDFHASDHFASDF", this.file)
    }

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
