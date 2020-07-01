import { DatamodelUtils, ServerAPI } from "@scifeon/core";
import { scifeonRoute } from "@scifeon/plugins";
import { IListViewColumnInfo, IListViewConfig } from "@scifeon/ui";
import { B10K } from "../b10k";
import "./table-s1.scss";

interface IGroup {
    selected: boolean;
    label: string;
}

@scifeonRoute({
    route: "b10k/tableS1",
    title: "TableS1",
})
export class TableS1 {
    public loading = false;
    public listViewConfig: IListViewConfig = {
        fields: B10K.FIELDS,
    };

    public selectedColumnInfos: IListViewColumnInfo[] = [];

    public fields = B10K.FIELDS;
    public records = [];
    public groups: IGroup[] = [];

    constructor(private server: ServerAPI) {
        this.fields.forEach(field => DatamodelUtils.patchField(field));
    }

    public async init() {
        this.loading = true;

        const ds = await this.server.datasetQuery([
            { eClass: "Genome", collection: "genomes", sortings: [{ field: "Name" }] },
            { eClass: "ResultFlex", collection: "results" },
        ]);

        for (const genome of ds.genomes) {
            const record = ds.results.find(r => r.subjectID === genome.id).results;

            this.records.push(record);
        }

        this.loading = false;
    }

    public attached() {
        this.compileGroups();
    }

    public groupChanged() {
        this.loading = true;

        const selectedGroups = this.groups.filter(group => group.selected);

        for (const ci of this.listViewConfig.columnInfos) {
            ci.column.selected = !!selectedGroups.find(group => group.label === ci.column.field.group);
        }

        this.selectedColumnInfos.splice(0, this.selectedColumnInfos.length);
        this.selectedColumnInfos.push(...this.listViewConfig.columnInfos);

        this.loading = false;
    }

    private compileGroups() {
        const groups: Set<string> = new Set();

        this.fields.forEach(field => groups.add(field.group));

        for (const groupName of groups) {
            if (groupName === "") continue;
            this.groups.push({ selected: true, label: groupName });
        }
    }

    public biosampleID(record) {
        if (!record.biosample) return;

        const term = record.biosample.slice(4);
        return +term.toString();
    }
}
