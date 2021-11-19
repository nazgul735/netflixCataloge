import {SearchData} from "./movies/movieTypes"; 
export interface StateType{
    page: PageType,
    paginationCount: PageType,
    searchQueries: SearchData,
    isLoggedIn: boolean,
}

interface PageType{
    payload:number
}

