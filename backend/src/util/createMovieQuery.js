"use strict";
exports.__esModule = true;
exports.createMovieQuery = void 0;
// Util function for creating query object used for filtering movies
function createMovieQuery(title, genre, fromYear, toYear) {
    var query = {};
    if (title) {
        query.title = { $regex: title, $options: "i" };
    }
    if (genre) {
        query.genres = genre;
    }
    if (fromYear && toYear) {
        if (fromYear > toYear)
            return query;
        query.year = {
            $lte: toYear.toString(),
            $gte: fromYear.toString()
        };
    }
    return query;
}
exports.createMovieQuery = createMovieQuery;
