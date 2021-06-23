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
    public url: string;
    private entity: Entity;


    public get linkExists() {
        return this.checkLink(this.url);
    }

    private checkLink(url) {
        var request = new XMLHttpRequest();

        request.open('GET', url, true);
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 404) {
                    alert("Oh no, it does not exist!");
                    return false;
                }
            }
        };

        request.send();

        console.log("REQUEST", request)

        return true;
    }

    public async init(context: PanelContext) {
        this.entity = context.entity;

        this.url = `https://sid.erda.dk/cgi-sid/ls.py?share_id=EPIKbljMg4;current_dir=data/${context.entity.name};flags=f"`
    }
}
