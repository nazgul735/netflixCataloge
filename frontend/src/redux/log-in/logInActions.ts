import {
    LOG_IN,
    LOG_OUT,
    LogInAction,
    LogOutAction

  } from "./logInTypes";


 export const logIn= (): LogInAction=>{
    return{
      type: LOG_IN
    }
 }

 export const logOut= (): LogOutAction=>{
    return{
      type: LOG_OUT
    }
 }