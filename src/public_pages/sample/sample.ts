import { Sample, ScifeonUser } from "@scifeon/core";
import { PAGE_TYPE, scifeonRoute } from "@scifeon/plugins";
import { autoinject } from "aurelia-framework";
import "../common/styles/common.scss";
import SampleData from "./data/sample.data";
import { Router } from "aurelia-router";

/**
 * Public page displaying a B10K a Sample entity.
 */
@scifeonRoute({
    title: "Sample",
    route: "b10k/sample/:id",
    type: PAGE_TYPE.PUBLIC,
    })
@autoinject
export class SamplePage {
    public sample: Sample;
    public url: string;
    public linkExists = false;

    constructor(
        private data: SampleData,
        private user: ScifeonUser,
        private router: Router,
    ) {}

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

    //     return true;
    // }

    // public async init(context: PanelContext) {
    //     const entity = context.entity;
    //     let id: string;

    //     if (entity.eClass === "Sample") {
    //         id = entity.name
    //     } else {
    //         const samples = await this.data.getSamples(entity.id);

    //         if (!samples.length) return;

    //         id = samples.slice(-1)[0].name;
    //     }

    //     this.url = `https://sid.erda.dk/cgi-sid/ls.py?share_id=EPIKbljMg4;current_dir=data/${id};flags=f`

    //     this.linkExists = this.checkLink(this.url);
    // }

    public async init(router) {
        const sampleID = router.params.id;

        if (this.user.isLoggedIn) {
            this.router.navigate(`/entity/Sample/${sampleID}`);
        }

        this.sample = await this.data.getSampleFromView(sampleID);
    }

    public attached() {
        document.body.classList.add("b10k-bg");
    }
    public detached() {
        document.body.classList.remove("b10k-bg");
    }
}
