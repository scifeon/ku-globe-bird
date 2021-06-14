import { CustomEventFactory, EventType, Sequence } from "@scifeon/core";
import { autoinject } from "aurelia-framework";

@autoinject
export default class ModalEditSamplesLogic {
    constructor(
        private element: Element,
    ) { }

    public dropFilesHandler($event) {
        const event = CustomEventFactory.create(EventType.DROP, $event, "files");
        this.element.dispatchEvent(event);
    }
}
