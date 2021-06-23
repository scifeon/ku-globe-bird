import { PanelContext, scifeonGridCard } from "@scifeon/plugins";
import { autoinject } from "aurelia-framework";
import RawDataCardData from "./data/raw-data-card.data";

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
@autoinject
export class RawDataCard {
    public url: string;
    public linkExists = false;

    constructor(private data: RawDataCardData) {}

    // private checkLink(url: string) {
    //     const request = new XMLHttpRequest();

    //     request.open('GET', url, true);
    //     request.onreadystatechange = () => {
    //         if (request.readyState === 4) {
    //             if (request.status === 404) {
    //                 alert("Oh no, it does not exist!");
    //                 return false;
    //             }
    //         }
    //     };

    //     request.send();

    //     console.log("REQUEST", request)

    //     return true;
    // }

    public async init(context: PanelContext) {
        const entity = context.entity;
        let id: string;

        if (entity.eClass === "Sample") {
            id = entity.name
        } else {
            const samples = await this.data.getSamples(entity.id);

            if (!samples.length) return;

            id = samples.slice(-1)[0].name;
        }

        this.url = `https://sid.erda.dk/cgi-sid/ls.py?share_id=EPIKbljMg4;current_dir=data/${id};flags=f"`

        this.linkExists = true;
        // this.linkExists = this.checkLink(this.url);
    }
}
