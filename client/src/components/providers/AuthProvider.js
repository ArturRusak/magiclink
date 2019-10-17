import React, { useState, useLayoutEffect } from "react";
import axios from "axios";

export const AuthContext = React.createContext();


function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(true);

  useLayoutEffect(() => {
    axios.interceptors.response.use(
      response => {
        setIsAuthorized(true);
        return response;
      },
      error => {
        if (error.response.status === 401) {
          setIsAuthorized(false);
        }

        return Promise.reject(error);
      });
  }, []);

  return <AuthContext.Provider value={isAuthorized} {...props} />;
}

export default AuthProvider;