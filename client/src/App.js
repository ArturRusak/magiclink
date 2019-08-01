import React from "react";
import "./App.css";
import { styled } from "baseui";
import { Header, Footer, LinksList, ContentBody } from "./components";

const App = styled("div", () => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "100vh"
}));

export default function() {
  return (
    <App className="App">
      <Header/>
      <ContentBody>
        <LinksList/>
      </ContentBody>
      <Footer/>
    </App>
  );
}