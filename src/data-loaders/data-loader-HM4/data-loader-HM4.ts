import { Dataset, DataType, Entity, Status, TaxonomyItem } from "@scifeon/core";
import { PapaparseOutput } from "@scifeon/data";
import { DataLoaderPlugin, IDataLoaderContext, scifeonDataLoader } from "@scifeon/plugins";
import { IListViewConfig } from "@scifeon/ui";

/**
 * Match function for data-loader plugin.
 *
 * @param context DataLader context
 * @returns true if match, else false.
 */
const match = (context: IDataLoaderContext) => {
    return context.fileInfos[0].filename.toLowerCase().endsWith("hm4_parsable.csv");
};

/**
 * Class for parsing data from Howard&Moore_4th_checklist - HM4_parsable.csv
 * and create for each row a TaxonmyItem to be saved in the database.
 *
 * @export
 * @class DataLoaderHM4
 */
@scifeonDataLoader({
    name: "Howard & More v4",
    description: "Load Howard-Moore_4th_checklist",
    match,
    rank: 1,
})
export class DataLoaderHM4 implements DataLoaderPlugin  {
    public entities: Entity[];
    public listViewConfig: IListViewConfig = {
        fields: [
            { accessor: "eClass" },
            { accessor: "type" },
            { accessor: "name" },
            { accessor: "familyName" },
            { accessor: "genusName" },
            { accessor: "speciesName" },
            { accessor: "attributes.familyEnglishName", label: "Family English Name" },
            { accessor: "attributes.speciesEnglishName", label: "Species English Name" },
            { accessor: "attributes.row", label: "Row", type: DataType.INT, format: "0" },
        ],
    };

    public getResult(): Dataset {
        return {
            entities: this.entities,
        };
    }

    public entitiesView?(): string {
        return require("./data-loader-HM4.html");
    }

    private processCSV(csv: PapaparseOutput) {
        this.entities = [];
        csv.data.shift();
        const lookup = new Set();

        for (const csvRow of csv.data) {
            const row = this.createRowObject(csvRow);

            if (lookup.has(row.speciesScientificName)) continue;

            const latinName = row.speciesScientificName.split(" ");

            const taxItem: TaxonomyItem = {
                eClass: "TaxonomyItem",
                type: "Bird",
                status: Status.ACTIVE,
                name: row.speciesScientificName,
                familyName: row.familyScientificName,
                genusName: latinName[0],
                speciesName: latinName[1],
            };

            taxItem.attributes = {
                row: row.row,
                familyEnglishName: row.familyEnglishName,
                speciesEnglishName: row.speciesEnglishName,
            };

            this.entities.push(taxItem);
            lookup.add(row.speciesScientificName);
        }
    }

    private createRowObject(row: any[]): any {
        return {
            row: row[0].trim(),
            familyScientificName: row[1].trim(),
            familyEnglishName: row[2].trim(),
            genusName: row[3].trim(),
            speciesScientificName: row[4].trim(),
            speciesEnglishName: row[5].trim(),
        };
    }

    init(context: IDataLoaderContext) {
        for (const fileInfo of context.fileInfos) {
            this.processCSV(fileInfo.csv);
        }
    }
}
