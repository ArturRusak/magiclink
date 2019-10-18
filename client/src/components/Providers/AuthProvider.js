import React, { useState, useLayoutEffect } from "react";
import axios from "axios";

export const AuthContext = React.createContext();


function AuthProvider(props) {
  return <AuthContext.Provider {...props} />;
}

export default AuthProvider;