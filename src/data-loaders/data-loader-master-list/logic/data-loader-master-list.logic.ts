import { ObjectUtils } from "@scifeon/core";

export default class DataLoaderMasterListLogic {
    /**
     * Merge two given collections on a maching given key and return the
     * merged collection.
     *
     * @param collection1 Collection1.
     * @param collection2 Collectoin2.
     * @returns Merged collection.
     */
    public mergeCollections(collection1: any[], collection2: any[], key: string): any[] {
        const merged: any[] = ObjectUtils.cloneDeep(collection1);
        const lookup = this.compileLookup(merged, key);

        for (const item of collection2) {
            if (lookup[item[key]]) {
                Object.assign(lookup[item[key]], item);
            } else {
                merged.push(item);
            }
        }

        return merged;
    }

    /**
     * Compile from a given collection of items a lookup hash map with a given
     * key as key and the item as value.
     *
     * @param collection Collection.
     * @param key Lookup key.
     * @returns Lookup hash map.
     */
    private compileLookup(collection: any[], key: string): { [key: string]: any } {
        const lookup = {};

        collection.forEach(item => lookup[item[key]] = item);

        return lookup;
    }
}
