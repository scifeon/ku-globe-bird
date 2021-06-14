import { scifeonGridCard } from "@scifeon/plugins";
import "./styles/contribute-card.scss";

@scifeonGridCard({
    id: "contribute",
    name: "Contribute",
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
export class ContributeCard {}
