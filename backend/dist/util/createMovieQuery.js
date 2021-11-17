"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMovieQuery = void 0;
// type yearType = {
//   "$lte": string,
//   "$gte": string
// }
// type titleType = {
//   "$regex": string |undefined
//   "$options": string|undefined
// }
// type queryType = {
//   title: titleType|undefined
//   genres: string|undefined
//   year: yearType|undefined
// }
function createMovieQuery({ title, genre, fromYear, toYear }) {
    //let query types be undefined as they´re not set
    let query = { title: undefined, genres: undefined, year: undefined };
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
