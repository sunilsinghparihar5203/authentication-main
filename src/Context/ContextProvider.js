import React, { useState } from "react";
import { AuthContext } from "./Context";

function AuthContextProvider(props) {
  const initialToken = localStorage.getItem('token')
  const [token, setToken] = useState(initialToken);
  
  const userIsLoggedIn = !!token;

  const loginHandler = (token) =>{
      setToken(token)
      localStorage.setItem('token',token)
  }

  const LogoutHandler = () =>{
    setToken(null)
    localStorage.removeItem('token');
  }

  const contextValue = {
    token:token,
    isLoggedIn:userIsLoggedIn,
    login:loginHandler,
    logout:LogoutHandler
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
