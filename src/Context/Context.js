import React,{createContext} from 'react'


export const AuthContext = createContext({
  token:'',
  isLoggedIn : false,
  login:(token)=>{},
  logout: ()=>{}
})