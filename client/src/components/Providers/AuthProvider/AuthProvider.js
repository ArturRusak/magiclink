import React from "react";
export const AuthContext = React.createContext();


function AuthProvider(props) {
  return <AuthContext.Provider {...props} />;
}

export default AuthProvider;
