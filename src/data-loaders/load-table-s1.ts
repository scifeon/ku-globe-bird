import { DataModel, Dataset, Entity } from "@scifeon/core";
import { SpreadsheetUtils } from "@scifeon/data";
import { DataLoaderPlugin, IDataLoaderContext, scifeonDataLoader } from "@scifeon/plugins";
import { WorkBook, WorkSheet } from "@scifeon/plugins/src/xlsx-types";
import { B10K } from "../b10k";

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
        for (let xlRow = 3; xlRow < SpreadsheetUtils.getXlrowMax(sheet); xlRow++) {
            if (!sheet["A" + xlRow]) continue;

            const gi = {
                b10kID: sheet["A" + xlRow].v,
                values: {}
            };
            this.readRow(gi, sheet, xlRow);

            this.genomeInfos.push(gi);
        }
    }

    readRow(gi: any, sheet: WorkSheet, xlRow: number) {
        for (let iCol = 0; iCol < B10K.fields.length; iCol++) {
            const xlCol = iCol + 1;
            const field = B10K.fields[iCol];
            gi.values[field.name] = sheet[SpreadsheetUtils.columnToLabel(iCol) + xlRow]?.v;
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
