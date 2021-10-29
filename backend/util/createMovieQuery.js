// Util function for creating query object used for filtering movies
export function createMovieQuery(title, genre, fromYear, toYear) {
  let query = {};
  if (title) {
    query.title = {$regex:title, $options:"i"};
  }
  if (genre) {
    query.genres = genre;
  }
  if (fromYear && toYear) {
    if (fromYear > toYear) return query;
    query.year = {
      $lte: toYear.toString(),
      $gte: fromYear.toString()
    };
  }
  return query;
}
