"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createMovieQuery_1 = require("../util/createMovieQuery");
const jest_each_1 = __importDefault(require("jest-each"));
function randomInt(n) {
    return Math.floor(n * Math.random());
}
//const alphaNum = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
// Generate random UTF-16 character
function randomChar() {
    String.fromCharCode(randomInt(65535));
}
function randomString(n) {
    let _throwaway = Array(randomInt(n)).fill(undefined);
    return _throwaway.reduce((a, b) => a + randomChar(), "");
}
function genTestCase(f, v) {
    return [v, f(v)];
}
function genTestCases(n, f, inputGen) {
    let results = [];
    for (let i = 0; i < n; i++) {
        let input = inputGen();
        results.push([input, f(input), i]);
    }
    return results;
}
function getTitleQuery(input) {
    return input ? { title: { $regex: input, $options: "i" } } : {};
}
function getGenreQuery(input) {
    return input ? { genres: input } : {};
}
function getYearQuery([from, to]) {
    return from > to ? {} : { year: { $lte: to.toString(), $gte: from.toString() } };
}
function genRandomInput() {
    let inputs = [randomString(25), randomString(25), randomInt(10000), randomInt(10000)];
    inputs.map((f) => randomInt(1) ? f : null);
    return inputs;
}
function getCompleteQuery(input) {
    let query = {};
    const fields = ["title", "genres", "year"];
    const queries = [getTitleQuery, getGenreQuery, getYearQuery];
    input.forEach((e, i) => { if (e)
        query[fields[i]] = queries[i](e)[fields[i]]; });
    return query;
}
describe("Correctly creates title query", () => {
    (0, jest_each_1.default)(genTestCases(100, getTitleQuery, () => randomString(25))).test("", (input, expected, i) => {
        let created = (0, createMovieQuery_1.createMovieQuery)(input, null, null, null);
        expect(created).toEqual(expected);
    });
});
describe("Correctly creates genre query", () => {
    (0, jest_each_1.default)(genTestCases(100, getGenreQuery, () => randomString(25))).test("", (input, expected, i) => {
        let created = (0, createMovieQuery_1.createMovieQuery)(null, input, null, null);
        expect(created).toEqual(expected);
    });
});
describe("Correctly creates from and to year query", () => {
    (0, jest_each_1.default)(genTestCases(100, getYearQuery, () => [randomInt(9999), randomInt(9999)])).test("", ([from, to], expected, i) => {
        let created = (0, createMovieQuery_1.createMovieQuery)(null, null, from, to);
        expect(created).toEqual(expected);
    });
});
describe("Correctly creates arbitrary query", () => {
    (0, jest_each_1.default)(genTestCases(100, getCompleteQuery, () => [randomInt(9999), randomInt(9999)])).test("", ([title, genre, from, to], expected, i) => {
        let created = (0, createMovieQuery_1.createMovieQuery)(title, genre, from, to);
        expect(created).toEqual(expected);
    });
});
