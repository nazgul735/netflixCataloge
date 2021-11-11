// Util function for creating query object used for filtering movies
export function createMovieQuery(title: String, genre: String, fromYear: Number, toYear:Number,) {
    let query = {};
    if (title) {
      (query as any).title = {$regex:title, $options:"i"};
    }
    if (genre) {
      (query as any).genres = genre;
    }
    if (fromYear && toYear) {
      if (fromYear > toYear) return query;
      (query as any).year = {
        $lte: toYear.toString(),
        $gte: fromYear.toString()
      };
    }
    return query;
  }
  