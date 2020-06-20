import { ServerAPI } from "@scifeon/core";
import { scifeonRoute } from "@scifeon/plugins";
import { B10K } from "../b10k";

@scifeonRoute({
    route: "b10k/tableS1",
    title: "TableS1",
})
export class TableS1 {
    constructor(private server: ServerAPI) {}

    public rowInfos: any[] = [];
    public fields = B10K.fields;

    public async init() {
        const ds = await this.server.datasetQuery([
            { eClass: "Genome", collection: "genomes", sortings: [{ field: "Name" }] },
            { eClass: "ResultFlex", collection: "results" },
        ]);

        for (const genome of ds.genomes) {
            this.rowInfos.push({
                genome,
                rFlex: ds.results.find(r => r.subjectID === genome.id),
            })
        }
    }
}