import React, { useState, useEffect, useContext } from "react";

export const AuthContext = React.createContext();

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    function handleNotAuthorized() {
      setIsAuthorized(false);
    }

    window.addEventListener("notauthorized", handleNotAuthorized);
    return () =>
      window.removeEventListener("notauthorized", handleNotAuthorized);
  }, []);

  if (!isAuthorized) {
    return "Not authorized";
  }

  return <AuthContext.Provider value={user} {...props} />;
}

export function AuthProtection({ children }) {
  const context = useContext(AuthContext);
  return <React.Fragment>{children}</React.Fragment>;
}



