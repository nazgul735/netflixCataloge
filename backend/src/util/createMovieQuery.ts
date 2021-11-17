export interface createMovieQueryInterface{ /*Need "any" as option in order to write tests in js*/
  title:string,
  genre:string, 
  fromYear:number, 
  toYear:number
}

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

export function createMovieQuery(
  {title,
  genre, 
  fromYear, 
  toYear}:createMovieQueryInterface
  ) {
    //let query types be undefined as they´re not set
  let query:any = {title:undefined, genres:undefined, year:undefined}; 
  if (title) {
    query.title= {$regex:title, $options: "i"};
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

