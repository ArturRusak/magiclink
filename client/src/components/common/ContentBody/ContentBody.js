import React, { useContext } from "react";
import { styled } from "baseui";
import { Route } from "react-router-dom";

import { Home, LinkInfo, LinksList, Login } from "../../index";
import { AuthProvider, AuthProtection } from "../../providers/AuthProvider";

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
      <AuthProvider>
        <AuthProtection>
          <Route exact path="/" component={Home}/>
        </AuthProtection>
        <Route exact path="/links" component={LinksList}/>
        <Route path="/links/:linkId" component={LinkInfo}/>
        <Route exact path="/login" component={Login}/>
      </AuthProvider>
    </ContentBody>
  );
}
