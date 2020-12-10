import { ServerAPI } from "@scifeon/core";
import { autoinject } from "aurelia-framework";

@autoinject
export default class BirdsDataAPI {
    constructor(private server: ServerAPI) {}

    public async getAllEntities(eClass: string) {
        const length = await this.server.getEntityCount(eClass);
        const response = await this.server.getEntities(eClass, [], [], 0, length);

        return response.data;
    }
}
