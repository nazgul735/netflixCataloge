"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMovieQuery = void 0;
function createMovieQuery({ title, genre, fromYear, toYear }) {
    let query = {}; //not too happy about this part
    if (title) {
        query.title = { $regex: title, $options: "i" };
        console.log(query);
    }
    if (genre) {
        query["genres"] = genre;
    }
    if (fromYear && toYear) {
        query["year"] = {
            $lte: toYear.toString(),
            $gte: fromYear.toString()
        };
    }
    return query;
}
exports.createMovieQuery = createMovieQuery;
