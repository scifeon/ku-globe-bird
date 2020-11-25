import { Sample } from "@scifeon/core";
import { DataRowUtil, EntityMapper, SpreadsheetUtils } from "@scifeon/data";
import { WorkSheet } from "@scifeon/plugins/src/xlsx-types";

export default class DataLoaderMasterListDataAPI {
    private dataRowUtil = new DataRowUtil();
    private entityMapper = new EntityMapper();

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
