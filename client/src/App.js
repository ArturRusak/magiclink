import React, { useMemo, useState } from "react";

import { styled } from "baseui";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../src/components/Providers/AuthProvider"
import Header from "../src/components/common/Header";
import Footer from "../src/components/common/Footer";
import Router from "../src/components/Router";
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

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const memoValue = useMemo(
    () => {

      axios.interceptors.response.use(
        response => {
          // TODO optimization of renderers, need depending in memo for one variable
          if (!response.data.currentUser) {
            setIsAuthenticated(false);
            setCurrentUser(null);
            return response;
          }
          setIsAuthenticated(true);
          setCurrentUser(response.data.currentUser);
          return response;
        },
        error => {
          const {response} = error;
          if (response.status === 401 || response.data.currentUser) {
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
