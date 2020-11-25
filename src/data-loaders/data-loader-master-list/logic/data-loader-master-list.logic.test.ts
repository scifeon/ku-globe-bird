import { assert } from "chai";
import DataLoaderMasterListLogic from "./data-loader-master-list.logic";

const logic = new DataLoaderMasterListLogic();

describe("DataLoaderMasterListLogic", () => {
    describe("compileUniqueB10KIds", () => {
        describe("with sample list containing duplicate names", () => {
            it("should return list of unique names", () => {
                const samples = [
                    { name: "foo" },
                    { name: "bar" },
                    { name: "foo" },
                ];

                const uniqueNames = logic.compileUniqueB10KIds(samples);
                const actual = JSON.stringify(uniqueNames);
                const expected = JSON.stringify(["foo", "bar"]);

                assert.equal(actual, expected);
            });
        });
    });

    describe("mergeEntityCollections", () => {

    });
});
