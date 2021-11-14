export function createMovieQuery(
  title: string,
  genre: string, 
  fromYear:number, 
  toYear:number
  ) {
  let query:any = {}; //not too happy about this part
  if (title) {
    query.title= {$regex:title, $options:"i"};
    console.log(query)
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

