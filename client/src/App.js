import React, { useEffect, useState } from "react";

import { styled } from "baseui";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, Header, Footer, Router } from "./components";
import axios from "axios";

import "./App.css";

const App = styled("div", () => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "100vh"
}));

export default function() {
  // using the state in the component for except unnecessary renders
  // of providers children

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    axios.interceptors.response.use(
      response => {
        setIsAuthenticated(true);
        return response;
      },
      error => {
        if (error.response.status === 401) {
          setIsAuthenticated(false);
        }

        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <BrowserRouter>
      <App className="App">
        <AuthProvider
          value={{
            isAuthenticated: isAuthenticated,
            logOut: () => setIsAuthenticated(false)
          }}
        >
          <Header/>
          <Router/>
        </AuthProvider>
        <Footer/>
      </App>
    </BrowserRouter>
  );
}
