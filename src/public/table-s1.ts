import { DatamodelUtils, LoadingSpinner, ResultFlex, ServerAPI } from "@scifeon/core";
import { PAGE_TYPE, scifeonRoute } from "@scifeon/plugins";
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
    ) {
        this.fields.forEach(field => DatamodelUtils.patchField(field));
        this.compileGroups();
        this.setDefaultSelectedColumns();
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

        LoadingSpinner.hide();
    }

    /**
     * Event handler for changing a group of columns to be displayed in the
     * table.
     */
    public groupChanged() {
        this.recordsReady = false;

        const selectedGroups = this.groups.filter(group => group.selected);

        const selectedColumnInfos: IListViewColumnInfo[] = [];

        for (const ci of this.listViewConfig.columnInfos) {
            ci.column.selected = false;
            const minWidth = ci.column.field.label.length * 10;
            ci.column.width = ci.column.width || minWidth < 100 ? 100 : minWidth;
            ci.minWidth = 100;
        }

        for (const group of selectedGroups) {
            for (const ci of this.listViewConfig.columnInfos.filter(ci => ci.column.field.group === group.label)) {
                ci.column.selected = true;
                selectedColumnInfos.push(ci);
            }
        }

        this.selectedColumnInfos.splice(0, this.selectedColumnInfos.length);
        this.selectedColumnInfos.push(...selectedColumnInfos);

        this.recordsReady = true;
    }

    /**
     * Exctract the numerical part of a biosample Id for use in external link.
     * @example "ABCD0000123" -> "123".
     * @param record Data record
     */
    public biosampleID(record): string {
        if (!record.biosample) return;

        const term = record.biosample.slice(4);
        const num = +term;
        return num.toString();
    }

    /**
     * Compile a list of groups with label and selected state.
     */
    private compileGroups() {
        const groups: Set<string> = new Set();

        this.fields.forEach(field => groups.add(field.group));

        for (const groupName of groups) {
            if (groupName === "") continue;

            if (groupName === "Taxonomy") {
                this.groups.push({ selected: true, label: groupName });
            } else {
                this.groups.push({ selected: false, label: groupName });
            }
        }

        this.groupsReady = true;

        this.recordsReady = true;
    }

    /**
     * Set default selected columns based on selected groups.
     */
    private setDefaultSelectedColumns() {
        const selected = [];

        for (const field of this.fields) {
            const group = this.groups.find(g => g.label === field.group);

            if (!group) continue;
            if (!group.selected) continue;

            selected.push(field);
        }

        if (!selected.length) return;

        this.listViewConfig.selected = selected;
    }
}
