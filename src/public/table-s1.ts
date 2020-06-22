import { DatamodelUtils, ServerAPI } from "@scifeon/core";
import { scifeonRoute } from "@scifeon/plugins";
import { IDataSource, IListViewConfig } from "@scifeon/ui";
import { B10K } from "../b10k";
import "./table-s1.scss";

interface IGroup {
    selected: boolean;
    label: string;
};

@scifeonRoute({
    route: "b10k/tableS1",
    title: "TableS1",
})
export class TableS1 {
    public listViewConfig: IListViewConfig = {
        fields: B10K.fields,
    };

    public dataSource: IDataSource<any>;

    // public rowInfos: any[] = [];
    public fields = B10K.fields;
    public records = [];
    public groups: IGroup[] = [];

    constructor(private server: ServerAPI) {
        this.fields.forEach(field => DatamodelUtils.patchField(field));
    }

    public async init() {
        const ds = await this.server.datasetQuery([
            { eClass: "Genome", collection: "genomes", sortings: [{ field: "Name" }] },
            { eClass: "ResultFlex", collection: "results" },
        ]);

        for (const genome of ds.genomes) {
            // this.rowInfos.push(
            //     {
            //         genome,
            //         rFlex: ds.results.find(r => r.subjectID === genome.id),
            //     },
            // );

            const record = ds.results.find(r => r.subjectID === genome.id).results;

            this.records.push(record);
        }
    }

    public attached() {
        this.compileGroups();
    }

    public groupChanged() {
        const selectedGroups = this.groups.filter(group => group.selected);

        for (const ci of this.listViewConfig.columnInfos) {
            ci.column.selected = !!selectedGroups.find(group => group.label === ci.column.field.group);
        }

        console.log("TableS1 -> groupChanged -> this.listViewConfig", this.listViewConfig)

        this.dataSource.refresh();
    }

    private compileGroups() {
        const groups: Set<string> = new Set();

        this.fields.forEach(field => groups.add(field.group));

        for (const groupName of groups) {
            if (groupName === "") continue;
            this.groups.push({ selected: true, label: groupName });
        }
    }
}
