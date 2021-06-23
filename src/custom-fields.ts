import { DataType, Field, IFieldGroup } from "@scifeon/core";
import { PluginManager, PLUGIN_TYPE, scifeonPlugin } from "@scifeon/plugins";

@scifeonPlugin({
    type: PLUGIN_TYPE.BOOTSTRAPPER,
})
export class B10KCustomFields {
    // tslint:disable-next-line: no-big-function
    constructor(private pluginManager: PluginManager) {
        const fields: Field[] = [
            // >>>>>>>>>>>>>>>>>>>>>>>> BIOINFORMATICS <<<<<<<<<<<<<<<<<<<<<<<<
            {
                match: { eClass: "Sample" },
                accessor: "attributes.assembled",
                type: DataType.BOOLEAN,
                label: "Assembled",
                group: "bioinformatics",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.assemblePrefix",
                type: DataType.STRING,
                label: "Assemble Prefix",
                group: "bioinformatics",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.moleculeLen",
                type: DataType.STRING,
                label: "Molecule Length",
                group: "bioinformatics",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.contigN50",
                type: DataType.INT,
                label: "Contig N50",
                group: "bioinformatics",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.contigL50",
                type: DataType.INT,
                label: "Contig L50",
                group: "bioinformatics",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.contigNum",
                type: DataType.INT,
                label: "Contig Number",
                group: "bioinformatics",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.scaffoldN50",
                type: DataType.INT,
                label: "Scaffold N50",
                group: "bioinformatics",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.scaffoldL50",
                type: DataType.INT,
                label: "Scaffold L50",
                group: "bioinformatics",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.scaffoldNum",
                type: DataType.INT,
                label: "Scaffold Number",
                group: "bioinformatics",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.totalLenBp",
                type: DataType.INT,
                label: "Total Length (bp)",
                group: "bioinformatics",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.gapLenBp",
                type: DataType.INT,
                label: "Gap Length (bp)",
                group: "bioinformatics",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.gapRatio",
                type: DataType.FLOAT,
                label: "Gap Ratio",
                group: "bioinformatics",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.completeBUSCOs",
                type: DataType.FLOAT,
                label: "Complete BUSCOs",
                group: "bioinformatics",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.completeAndSingleCopyBUSCOsS",
                type: DataType.FLOAT,
                label: "Complete and single-copy BUSCOs (S)",
                group: "bioinformatics",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.completeAndDuplicatedBUSCOsD",
                type: DataType.FLOAT,
                label: "Complete and Duplicated BUSCOs (D)",
                group: "bioinformatics",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.fragmentedBUSCOsF",
                type: DataType.FLOAT,
                label: "Fragmented BUSCOs (F)",
                group: "bioinformatics",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.missingBUSCOsM",
                type: DataType.FLOAT,
                label: "Missing BUSCOs (M)",
                group: "bioinformatics",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.buscoTotalInformation",
                type: DataType.STRING,
                label: "BUSCO Total Information",
                group: "bioinformatics",
            },
            {
                match: { eClass: "Sample" },
                accessor: "name",
                type: DataType.STRING,
                label: "ERDA",
                ui: {
                    render: 'https://sid.erda.dk/cgi-sid/ls.py?share_id=EPIKbljMg4;current_dir=data/${record.name};flags=f',
                },
                group: "bioinformatics",
            },


            // >>>>>>>>>>>>>>>>>>>>>>>> TAXONOMY <<<<<<<<<<<<<<<<<<<<<<<<

            {
                match: { eClass: "Sample" },
                accessor: "attributes.speciesName",
                type: DataType.STRING,
                label: "Species Name",
                group: "taxonomy",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.genus",
                type: DataType.STRING,
                label: "Genus",
                group: "taxonomy",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.family",
                type: DataType.STRING,
                label: "Family",
                group: "taxonomy",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.order",
                type: DataType.STRING,
                label: "Order",
                group: "taxonomy",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.commonName",
                type: DataType.STRING,
                label: "Common Name",
                group: "taxonomy",
            },
            // >>>>>>>>>>>>>>>>>>>>>>>> STATUS <<<<<<<<<<<<<<<<<<<<<<<<
            {
                match: { eClass: "Sample" },
                accessor: "attributes.sampleDataLevel",
                type: DataType.STRING,
                label: "Sample Data Level",
                group: "status",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.sampleStatus",
                type: DataType.STRING,
                label: "Sample Staus",
                group: "status",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.dnaStatus",
                type: DataType.STRING,
                label: "DNA Status",
                group: "status",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.sequencingStatus",
                type: DataType.STRING,
                label: "Sequencing Status",
                group: "status",
            },
            {
                match: { eClass: "Sample" },
                accessor: "attributes.assemblyStatus",
                type: DataType.STRING,
                label: "Assembly Status",
                group: "status",
            },
        ];

        const fieldGroups: IFieldGroup[] = [
            {
                name: "status",
                label: "Status",
                fields: [],
                displayFields: [],
            },
            {
                name: "bioinformatics",
                label: "Bioinformatics",
                fields: [],
                displayFields: [],
            },
            {
                name: "taxonomy",
                label: "Taxonomy",
                fields: [],
                displayFields: [],
            },
        ];

        for (const fieldGroup of fieldGroups) {
            this.pluginManager.add(fieldGroup, [PLUGIN_TYPE.FIELD_GROUP_TEMPLATE]);
        }

        for (const field of fields) {
            this.pluginManager.add(field, [PLUGIN_TYPE.FIELD_TEMPLATE]);
        }
    }
}

// no:  "NO-0423"
// phase:  "Phase Genus"
// b10kId:  "APP-001"
// bgiId:  "D1907003390"
// marker:  "Smithsonian Sample Batch 1"
// cites:  null
// hM:  "Aburria"
// sourceId:  "USNM-621707"
// source:  "USNM"
// id:  621707
// dnaQuality:  "Qualified"
// genomeQuality:  "Qualified"
// noteForQuality:  null
// tissueStoragePlace:  "BGI, HongKong"
// tissuePreservationConditions:  "-80 degree"
// tissueRemain:  "N"
// tissueForHic:  null
// batchOfExtract:  "Batch 4"
// dateTransferToShenzhen:  "2019-07-19"
// storageBatchNumber:  "SIDP01277"
// dnaStoragePlace:  "CNGB, Shenzhen"
// dnaPreservationConditions:  "-80 degree"
// dnaStorageDate:  "2-Aug-2019"
// dnaSolvent:  "Pure water"
// extractionMethod:  "salting-out method"
// dateOfTestingAccomplish:  "2019-09-18"
// dnaFragmentSizeBp:  29106
// sampleIntegrity:  "Complete degradation"
// totalMassNg:  3650
// concentrationNgL:  146
// volumeL:  25
// noteOd280260:  null
// covarisPcr300500bpWgs:  null
// stFLR:  null
// 10Xgenomics:  "W191119032"
// hiC:  null
// sequenceSerialNumber:  "W191119032"
// libraryId:  "CGJLib20191119-10X-B10K-DU-004-41"
// sequencingPlatform:  "BGI-SEQ 500"
// sequencingChipNumber:  "CL100139612_L02"
// barcode:  "read"
// sequenceDataPath:  "/ldfsqd1/zebra05/P18Z10200N0100_Temp/CL100139612_L02"
// sequenceDataPrefix:  "CL100139612_L02_read"
