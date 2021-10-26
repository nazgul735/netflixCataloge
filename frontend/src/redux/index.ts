import { combineReducers } from "redux";
import {searchReducer} from "./movies/moviesReducers";
import { pageReducer } from "./page/pageReducers";
import {logInReducer} from "./log-in/logInReducers"
// Combine all reducers.
const allReducers = combineReducers({
  page: pageReducer,
  searchQueries: searchReducer,
  isLoggedIn: logInReducer,
});

export default allReducers;