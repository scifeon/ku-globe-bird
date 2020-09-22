export default class BirdsLogic {
    public compileLatinNames(records: any[]) {
        for (const record of records) {
            record.latinName = [
                record.genusName,
                record.speciesName,
                record.subSpeciesName,
            ].join(" ");
        }
    }
}
