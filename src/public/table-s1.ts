import { DatamodelUtils, ResultFlex, ServerAPI } from "@scifeon/core";
import { PAGE_TYPE, scifeonRoute } from "@scifeon/plugins";
import { IListViewColumnInfo, IListViewConfig } from "@scifeon/ui";
import { TaskQueue } from 'aurelia-framework';
import { B10K } from "../b10k";
import "./table-s1.scss";

interface IGroup {
    selected: boolean;
    label: string;
}

@scifeonRoute({
    route: "b10k/tableS1",
    title: "TableS1",
    type: PAGE_TYPE.PUBLIC,
})
export class TableS1 {
    public groupsReady = false;
    public recordsReady = false;

    public listViewConfig: IListViewConfig = {
        fields: B10K.FIELDS,
    };

    public selectedColumnInfos: IListViewColumnInfo[] = [];

    public fields = B10K.FIELDS;
    public records = [];
    public groups: IGroup[] = [];

    constructor(
        private server: ServerAPI,
        private taskQueue: TaskQueue,
    ) {
        this.fields.forEach(field => DatamodelUtils.patchField(field));
    }

    public async attached() {
        const ds: {
            results: ResultFlex[];
        } = await this.server.datasetQuery([{
            view: "B10K_GenomeResults",
            collection: "results",
            sortings: [{ field: "GenomeName" }],
        }]);

        for (const result of ds.results) {
            this.records.push(JSON.parse(result.results));
        }

        this.compileGroups();
    }

    public groupChanged() {
        this.recordsReady = false;

        const selectedGroups = this.groups.filter(group => group.selected);

        for (const ci of this.listViewConfig.columnInfos) {
            ci.column.selected = !!selectedGroups.find(group => group.label === ci.column.field.group);
        }

        this.selectedColumnInfos.splice(0, this.selectedColumnInfos.length);
        this.selectedColumnInfos.push(...this.listViewConfig.columnInfos);

        this.recordsReady = true;
    }

    private compileGroups() {
        const groups: Set<string> = new Set();

        this.fields.forEach(field => groups.add(field.group));

        for (const groupName of groups) {
            if (groupName === "") continue;
            this.groups.push({ selected: true, label: groupName });
        }

        this.groupsReady = true;

        this.taskQueue.queueTask(() => this.recordsReady = true);
    }

    public biosampleID(record) {
        if (!record.biosample) return;

        const term = record.biosample.slice(4);
        return +term.toString();
    }
}
