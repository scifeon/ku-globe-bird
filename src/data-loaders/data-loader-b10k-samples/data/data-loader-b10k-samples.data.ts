import { Entity, Sample, ServerAPI } from "@scifeon/core";
import { DataRowUtil, EntityMapper, SpreadsheetUtils } from "@scifeon/data";
import { WorkSheet } from "@scifeon/plugins/src/xlsx-types";
import { autoinject } from "aurelia-framework";

@autoinject
export default class DataLoaderB10KSamplesData {
    private dataRowUtil = new DataRowUtil();
    private entityMapper = new EntityMapper();

    constructor(private server: ServerAPI) {}

    public async getEntities(eClass: string): Promise<Entity[]> {
        const length = await this.server.getEntityCount(eClass);
        const response = await this.server.getEntities(eClass, [], [], 0, length);

        return response.data;
    }

    public getExcelSamples(sheet: WorkSheet, columnNames) {
        const samples: Sample[] = [];

        const headerRow = this.dataRowUtil.findRowWithKeys(sheet, columnNames);
        const propertyNames = SpreadsheetUtils.readColTitles(sheet, headerRow, true, 30);

        for (let i = headerRow + 1; i <= SpreadsheetUtils.getXlrowMax(sheet); i++) {
            const values = SpreadsheetUtils.readColTitles(sheet, i, true, 30);
            const sampleObj = this.entityMapper.generateJSONObject(propertyNames, values);
            const sample = this.mapJsonToSample(sampleObj);

            if (Object.values(sample.attributes).every(value => value === null)) continue;

            samples.push(sample);
        }

        return samples;
    }

    private mapJsonToSample(obj: any): Sample {
        const unwanted = Object.keys(obj).filter(key => key.match(/property\d+/));
        unwanted.push("");
        unwanted.forEach(u => delete obj[u]);

        for (const [key, value] of Object.entries(obj)) {
            if (value === undefined) {
                obj[key] = null;
            }
        }

        return {
            eClass: "Sample",
            name: obj.b10kId,
            type: "Bird",
            description: obj.speciesName,
            attributes: obj,
        };
    }
}
