// tslint:disable: no-big-function no-duplicate-string
import { assert } from "chai";
import DataLoaderMasterListLogic from "./data-loader-master-list.logic";

const logic = new DataLoaderMasterListLogic();

describe("DataLoaderMasterListLogic", () => {
    describe("#compileUniqueB10KIds", () => {
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

    describe("#mergeEntityCollections", () => {
        describe("with collections of different properties", () => {
            it("should return merged collection", () => {
                const collection1 = [
                    { name: "foo", prop1: "prop1" },
                ];

                const collection2 = [
                    { name: "foo", prop2: "prop2" },
                ];

                const merged = logic.mergeEntityCollections(collection1, collection2);
                const actual = JSON.stringify(merged);
                const expected = JSON.stringify(
                    [
                        {
                            name : "foo",
                            prop1: "prop1",
                            prop2: "prop2",
                        },
                    ],
                );

                assert.equal(actual, expected);
            });
        });

        describe("with collection1 containing more elements", () => {
            it("should return merged collection", () => {
                const collection1 = [
                    { name: "foo", prop1: "prop1" },
                    { name: "bar", prop3: "prop3" },
                ];

                const collection2 = [
                    { name: "foo", prop2: "prop2" },
                ];

                const merged = logic.mergeEntityCollections(collection1, collection2);
                const actual = JSON.stringify(merged);
                const expected = JSON.stringify(
                    [
                        {
                            name : "foo",
                            prop1: "prop1",
                            prop2: "prop2",
                        },
                        {
                            name: "bar",
                            prop3: "prop3",
                        },
                    ],
                );

                assert.equal(actual, expected);
            });
        });

        describe("with collection2 containing more elements", () => {
            it("should return merged collection", () => {
                const collection1 = [
                    { name: "foo", prop1: "prop1" },
                ];

                const collection2 = [
                    { name: "foo", prop2: "prop2" },
                    { name: "bar", prop3: "prop3" },
                ];

                const merged = logic.mergeEntityCollections(collection1, collection2);
                const actual = JSON.stringify(merged);
                const expected = JSON.stringify(
                    [
                        {
                            name : "foo",
                            prop1: "prop1",
                            prop2: "prop2",
                        },
                        {
                            name: "bar",
                            prop3: "prop3",
                        },
                    ],
                );

                assert.equal(actual, expected);
            });
        });

        describe("with collection1 containing name-less elements", () => {
            it("should return merged collection", () => {
                const collection1 = [
                    { prop1: "prop1" },
                ];

                const collection2 = [
                    { name: "foo", prop2: "prop2" },
                    { name: "bar", prop3: "prop3" },
                ];

                const merged = logic.mergeEntityCollections(collection1, collection2);
                const actual = JSON.stringify(merged);
                const expected = JSON.stringify(
                    [
                        {
                            prop1: "prop1",
                        },
                        {
                            name : "foo",
                            prop2: "prop2",
                        },
                        {
                            name: "bar",
                            prop3: "prop3",
                        },
                    ],
                );

                assert.equal(actual, expected);
            });
        });

        describe("with collection2 containing name-less elements", () => {
            it("should return merged collection", () => {
                const collection1 = [
                    { name: "foo", prop1: "prop1" },
                ];

                const collection2 = [
                    { prop2: "prop2" },
                    { name: "bar", prop3: "prop3" },
                ];

                const merged = logic.mergeEntityCollections(collection1, collection2);
                const actual = JSON.stringify(merged);
                const expected = JSON.stringify(
                    [
                        {
                            name: "foo",
                            prop1: "prop1",
                        },
                        {
                            prop2: "prop2",
                        },
                        {
                            name: "bar",
                            prop3: "prop3",
                        },
                    ],
                );

                assert.equal(actual, expected);
            });
        });

        describe("with collection2 containing name-less elements", () => {
            it("should return merged collection", () => {
                const collection1 = [
                    { name: "foo", prop1: "prop1" },
                ];

                const collection2 = [
                    { name: "foo", prop2: "prop2" },
                    { prop3: "prop3" },
                ];

                const merged = logic.mergeEntityCollections(collection1, collection2);
                const actual = JSON.stringify(merged);
                const expected = JSON.stringify(
                    [
                        {
                            name: "foo",
                            prop1: "prop1",
                            prop2: "prop2",
                        },
                        {
                            prop3: "prop3",
                        },
                    ],
                );

                assert.equal(actual, expected);
            });
        });
    });
});
