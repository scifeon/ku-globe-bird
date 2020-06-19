import { DataModel, Dataset, Entity } from "@scifeon/core";
import { SpreadsheetUtils } from "@scifeon/data";
import { DataLoaderPlugin, IDataLoaderContext, scifeonDataLoader } from "@scifeon/plugins";
import { WorkBook } from "@scifeon/plugins/src/xlsx-types";

const match = (context: IDataLoaderContext) => {
    // only allow loading from module/data-upload
    if (context.entity) return false;

    // there must be at least one spreadsheet
    if (!context.fileInfos.some(fi => fi.wb)) return false;

    return context.fileInfos[0].filename === "b10k-table-s1.xlsx";
};

interface GenomeInfo {
    b10kID: string;
    genome?: any;
    values: {};
}

@scifeonDataLoader({
    name: "B10K-S1",
    description: "Load B10K Table S1",
    match,
    rank: 1,
})
export class LoadB10KTableS1 implements DataLoaderPlugin {
    constructor(private datamodel: DataModel) { }

    workbook: WorkBook;
    entities: Entity[];
    genomeInfos: GenomeInfo[];

    public init(context: IDataLoaderContext) {
        this.workbook = context.fileInfos[0].wb;
    }

    public readFiles() {
        const sheet = this.workbook.Sheets["Sheet1"];
        //this.readFields(spreadsheet);

        this.genomeInfos = [];
        for (let xlRow = 2; xlRow < SpreadsheetUtils.getXlrowMax(sheet); xlRow++) {
            if (!sheet["A" + xlRow]) continue;

            this.genomeInfos.push({
                b10kID: sheet["A" + xlRow].v,
                values: {}
            });
        }
    }

    public entitiesView = () => `
        <ul>
            <li repeat.for="gi of genomeInfos">#{gi.b10kID}</li>
        </ul>
    `

    public getResult(): Dataset {
        return {
            entities: this.entities,
        };
    }
}
