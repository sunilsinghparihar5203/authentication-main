import React, { useState } from "react";
import { AuthContext } from "./Context";

function AuthContextProvider(props) {
  const [token, setToken] = useState(null);
  
  const userIsLoggedIn = !!token;

  const loginHandler = (token) =>{
      setToken(token)
  }

  const LogoutHandler = () =>{
    setToken(null)
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
