import React from "react";
import { styled } from "baseui";
import { Route } from "react-router-dom";

import { Home, LinkInfo, LinksList, Navigation } from "../../index";

const ContentBody = styled("div", () => ({
  flexGrow: "1",
  maxWidth: "1280px",
  width: "100%",
  padding: "1em 1.5em",
  margin: "0 auto"
}));

export default function() {
  return (
    <ContentBody>
      <Navigation/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/links" component={LinksList}/>
      <Route path="/links/:linkId" component={LinkInfo}/>
    </ContentBody>
  );
}
