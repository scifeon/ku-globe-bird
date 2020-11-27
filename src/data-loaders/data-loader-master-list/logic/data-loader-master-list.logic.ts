import { Entity, Sample } from "@scifeon/core";

export default class DataLoaderMasterListLogic {
    public compileNameSet(samples: Sample[]): Set<string> {
        const sampleNames: Set<string> = new Set();

        for (const sample of samples) {
            sampleNames.add(sample.name);
        }

        return sampleNames;
    }

    public mergeEntityCollections(collection1: Entity[], collection2: Entity[]): Entity[] {
        const lookup: { [key: string]: Entity } = {};

        for (const entity of collection1) {
            lookup[entity.name] = entity;
        }

        for (const entity2 of collection2) {
            const entity1 = lookup[entity2.name];

            if (entity1) {
                Object.assign(entity1, entity2);
                Object.assign(entity2, entity1);
            } else {
                lookup[entity2.name] = entity2;
            }
        }

        return Object.values(lookup);
    }
}
