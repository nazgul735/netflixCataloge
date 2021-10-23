export const UPDATE_MOVIES= "UPDATE_MOVIES";
export const UPDATE_SEARCH_DATA= "UPDATE_SEARCH_DATA"; 

export interface SearchData {
  searchQueries:{
    selectedGenre?: string; 
    fromYear?: number;
    toYear?: number; 
    searchString?: string; 
  }
}


export interface SearchAction {
  type: "UPDATE_SEARCH_DATA";
  payload: SearchData;
}