import { combineReducers } from "redux";
import {searchReducer} from "./movies/moviesReducers";
import { pageReducer } from "./page/pageReducers";
// Combine all reducers.
const allReducers = combineReducers({
  page: pageReducer,
  searchQueries: searchReducer
});

export default allReducers;