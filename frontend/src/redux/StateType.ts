import {SearchData} from "./movies/movieTypes"; 
export interface StateType{
    page: PageType,
    paginationCount: PageType,
    searchQueries: SearchData
}

interface PageType{
    payload:number
}

