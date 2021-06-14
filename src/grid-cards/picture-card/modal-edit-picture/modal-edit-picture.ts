import { AlertManager, TaxonomyItem } from "@scifeon/core";
import { IDialogPlugin } from "@scifeon/plugins";
import { Dialog, SavingSpinner } from "@scifeon/ui";
import { autoinject } from "aurelia-framework";
import { Base64 } from "js-base64";
import ModalEditSamplesDataAPI from "./data/modal-edit-picture.data";
import ModalEditSamplesLogic from "./logic/modal-edit-picture.logic";

@Dialog.template(require("./modal-edit-picture.html"))
@autoinject
export class ModalEditPicture implements IDialogPlugin {
    public taxonomyItem: TaxonomyItem;
    public imageData: Base64;

    private file: string;

    constructor(
        private dialog: Dialog,
        private alertManager: AlertManager,
        private logic: ModalEditSamplesLogic,
        private data: ModalEditSamplesDataAPI,
    ) { }

    // Handlers.

    public async dropFilesHandler(event: CustomEvent) {
        const file = event.detail.files[0];

        console.log(file)

        if (!["image/jpeg", "image/png"].includes(file.type)) {
            this.alertManager.userError(
                {
                    text: "Bad file format",
                    description: "Only PNG or JPG picture formats accepted, please try again.",
                }
            )

            return;
        }

        this.imageData = "data:image/jpeg;base64, " + await this.data.loadImageFile(file)

        console.log("imageData", this.imageData)

        this.file = file;
    }

    public async clickUpdateHandler() {
        SavingSpinner.show(".edit-samples-dialog", "Saving...");

        SavingSpinner.hide();

        this.dialog.ok({
            file: this.file,
            imageData: this.imageData,
        });
    }

    // life cycle hooks.

    public init(model) {
        this.taxonomyItem = model.taxonomyItem;
    }
}
