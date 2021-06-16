import ITaxItemRecord from "../../common/interfaces/tax-item-record.interface";

export default class StatsLogic {
    public compileStats(records: ITaxItemRecord[]) {
        const stats = [];
        const counts = {};

        // stats.push(
        //     {
        //         x: "Got samples",
        //         y: records.filter(record => record.sampleCount > 0).length,
        //     }
        // );

        for (const record of records) {
            if (!record.latestSample) continue;

            const status = record.latestSample.attributes.sampleDataLevel;

            if (!status) continue;

            if (!counts[status]) {
                counts[status] = 1;
            } else {
                counts[status] += 1;
            }
        }

        const keys = Object.keys(counts)

        for (const key of keys) {
            stats.push(
                { x: key, y: counts[key] },
            );
        }


        return stats;
    }
}