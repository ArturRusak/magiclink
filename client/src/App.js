import React, { useMemo, useState } from "react";

import { styled } from "baseui";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, Footer, Header, Router } from "./components";
import axios from "axios";

import "./App.css";

const App = styled("div", () => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "100vh"
}));

export default function () {
  // using the state in the component for except unnecessary renders
  // of providers children

  //TODO fix the AUTH loading web-site when start with page without query
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const memoValue = useMemo(
    () => {

      axios.interceptors.response.use(
        response => { // TODO optimization of renderers, need depending in memo for one variable
          setIsAuthenticated(true);
          setCurrentUser(response.data.currentUser);
          return response;
        },
        error => {
          if (error.response.status === 401) {
            setIsAuthenticated(false);
            setCurrentUser(null);
          }

          return Promise.reject(error);
        }
      );
      return {
        currentUser,
        isAuthenticated: isAuthenticated,
        logOut: () => setIsAuthenticated(false)
      }
    },
    [isAuthenticated, currentUser]
  );
  console.log("render");
  return (
    <BrowserRouter>
      <App className="App">
        <AuthProvider value={memoValue}>
          <Header/>
          <Router/>
        </AuthProvider>
        <Footer/>
      </App>
    </BrowserRouter>
  );
}
