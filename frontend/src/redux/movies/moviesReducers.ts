import {
    UPDATE_SEARCH_DATA,
    SearchAction,
    SearchData
  } from "./movieTypes";
  

const initialSearchQuery:SearchData={
    searchQueries:{
      selectedGenre: undefined,
      fromYear: undefined,
      toYear: undefined,
      searchString: undefined
    }
  }

export const searchReducer = (
    state = initialSearchQuery,
    action: SearchAction,
  )=> {
    switch (action.type) {
      case UPDATE_SEARCH_DATA:
        return {
          ...state,
          searchQueries: action.payload
        };
      default:
        return state;
    }
  };
  
