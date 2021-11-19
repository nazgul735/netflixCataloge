import {
    SearchData,
    SearchAction,
    UPDATE_SEARCH_DATA,

  } from "./movieTypes";


 export const updateSearchQueries= (searchQueries: SearchData): SearchAction=>{
    return{
      type: UPDATE_SEARCH_DATA,
      payload: searchQueries
    }
 }