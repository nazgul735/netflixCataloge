export interface createMovieQueryInterface{ /*Need "any" as option in order to write tests in js*/
  title:string|any,
  genre:string|any, 
  fromYear:number|any, 
  toYear:number|any
}
export function createMovieQuery(
  {title,
  genre, 
  fromYear, 
  toYear}:createMovieQueryInterface
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

