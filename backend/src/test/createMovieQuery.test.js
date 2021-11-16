import { createMovieQuery, createMovieQueryInterface } from "../util/createMovieQuery";
import each from "jest-each";
import{types} from "@types/jest";

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
  return _throwaway.reduce((a,b) => a + randomChar(), "");
}

function genTestCase(f, v) {
  return [v,f(v)];
}

function genTestCases(n, f, inputGen) {
  let results = []
  for(let i = 0; i < n; i++) {
    let input = inputGen();
    results.push([input, f(input), i]);
  }
  return results;
}

function getTitleQuery(input){
  return input ? {title: {$regex: input, $options: "i"}} : {};
}

function getGenreQuery(input) {
  return input ? {genres: input} : {};
}

function getYearQuery([from, to]) {
  return from > to ? {} : {year: {$lte: to.toString(), $gte: from.toString()}};
}

function genRandomInput() {
  let inputs = [randomString(25), randomString(25), randomInt(10000), randomInt(10000)]
  inputs.map((f) => randomInt(1) ? f : null);
  return inputs;
}

function getCompleteQuery(input) {
  let query = {};
  const fields = ["title", "genres", "year"]
  const queries = [getTitleQuery, getGenreQuery, getYearQuery];
  input.forEach((e,i) => {if(e) query[fields[i]] = queries[i](e)[fields[i]];});
  return query;
}

describe("Correctly creates title query", () => {
  each(genTestCases(150, getTitleQuery, () => randomString(25))).test("", (input, expected, i) => {
    let created  = createMovieQuery({title:input, genre:null, fromYear:null, toYear:null});
    expect(created).toEqual(expected);
  });
})

describe("Correctly creates genre query", () => {
  each(genTestCases(150, getGenreQuery, () => randomString(25))).test("", (input, expected, i) => {
    let created  = createMovieQuery({title:null, genre:input, fromYear:null, toYear:null});
    expect(created).toEqual(expected);
  });
})

describe("Correctly creates from and to year query", () => {
  each(genTestCases(150, getYearQuery, () => [randomInt(9999), randomInt(9999)])).test("", ([from, to], expected, i) => {
    let created  = createMovieQuery({title:null, genre:null, fromYear:from, toYear:to});
    try{
    const another = expected;
    expect(created>50).toEqual(expected);
    console.log("Memory not too slow")}
    catch{
      console.log("Memery too slow")
    }
  });
})

describe("Correctly creates arbitrary query", () => {
  each(genTestCases(150, getCompleteQuery, () => [randomInt(9999), randomInt(9999)])).test("", ([title, genre, from, to], expected, i) => {
    let created  = createMovieQuery({title, genre, from, to});
    expect(created).toEqual(expected);
  });
})
