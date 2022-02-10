
export default class BirdsLogic {
    public compileStats(records) {
        const stats = [];
        const counts = {
            statusCovered: 0,
            statusDna: 0,
            statusSequencing: 0,
            statusAssembly: 0,
        };

        for (const record of records) {
            if (record.latestStatusCovered === "Yes") counts.statusCovered += 1;
            if (record.latestStatusDna === "Yes") counts.statusDna += 1;
            if (record.latestStatusSequencing === "Yes") counts.statusSequencing += 1;
            if (record.latestStatusAssembly === "Yes") counts.statusAssembly += 1;
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