import { Entity } from "@scifeon/core";
import { PanelContext, scifeonGridCard } from "@scifeon/plugins";

@scifeonGridCard({
    id: "raw-data",
    name: "Raw Data",
    match: context => {
        const entity = context.entity;

        if (!entity.id) return false;
        if (!["TaxonomyItem", "Sample"].includes(entity.eClass)) return false;

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
export class RawDataCard {
    public entity: Entity;


    public get linkExists() {
        return true;
    }

    public async init(context: PanelContext) {
        this.entity = context.entity;
    }
}
