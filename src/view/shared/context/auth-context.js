import { createContext } from "react";


export const  authCotext = createContext({isLoggedIn :false,
      login :()=>{},
      type:null
      ,logout:()=>{},userId :null  , app :[],users:[]})