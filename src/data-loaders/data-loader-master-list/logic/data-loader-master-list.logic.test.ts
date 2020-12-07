// tslint:disable: no-big-function no-duplicate-string
import { assert } from "chai";
import DataLoaderMasterListLogic from "./data-loader-master-list.logic";

const logic = new DataLoaderMasterListLogic();

describe("DataLoaderMasterListLogic", () => {
    describe("#mergeCollections", () => {
        describe("with collections of different properties", () => {
            it("should return merged collection", () => {
                const collection1 = [
                    { name: "foo", prop1: "prop1" },
                ];

                const collection2 = [
                    { name: "foo", prop2: "prop2" },
                ];

                const merged = logic.mergeCollections(collection1, collection2, "name");
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

                const merged = logic.mergeCollections(collection1, collection2, "name");
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

                const merged = logic.mergeCollections(collection1, collection2, "name");
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

                const merged = logic.mergeCollections(collection1, collection2, "name");
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

                const merged = logic.mergeCollections(collection1, collection2, "name");
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

                const merged = logic.mergeCollections(collection1, collection2, "name");
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
