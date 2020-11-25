import { Sample, ServerAPI } from "@scifeon/core";
import { DataRowUtil, EntityMapper, SpreadsheetUtils } from "@scifeon/data";
import { WorkSheet } from "@scifeon/plugins/src/xlsx-types";
import { autoinject } from "aurelia-framework";

@autoinject
export default class DataLoaderMasterListDataAPI {
    private dataRowUtil = new DataRowUtil();
    private entityMapper = new EntityMapper();

    constructor(private server: ServerAPI) {}

    public getSamplesAll(sheet: WorkSheet, columnNames) {
        const samples: Sample[] = [];

        const headerRow = this.dataRowUtil.findRowWithKeys(sheet, columnNames);
        const propertyNames = SpreadsheetUtils.readColTitles(sheet, headerRow, false, 30);

        for (let i = headerRow + 1; i <= SpreadsheetUtils.getXlrowMax(sheet); i++) {
            const values = SpreadsheetUtils.readColTitles(sheet, i, true, 30);
            const sampleObj = this.entityMapper.generateJSONObject(propertyNames, values);
            const sample = this.mapJsonToSample(sampleObj);
            samples.push(sample);
        }

        return samples;
    }

    public async getSamplesByName(names: string[]): Promise<Sample[]> {
        const response = await this.server.getEntities(
            "Sample",
            [{ field: "name", values: names }],
        );

        return response.data;
    }

    private mapJsonToSample(obj: any): Sample {
        delete obj[""];

        return {
            eClass: "Sample",
            name: obj.b10kId,
            type: "Bird",
            description: obj.speciesName,
            attributes: obj,
        };
    }
}
