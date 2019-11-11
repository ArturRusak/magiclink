import React, { useContext } from "react";
import { AuthContext } from "../index";

import { Home, LinkInfo, LinksList, Login, Registration } from "../index";

import { styled } from "baseui";
import { Switch, Route, Redirect } from "react-router-dom";

const Router = styled("div", () => ({
  flexGrow: "1",
  maxWidth: "1280px",
  width: "100%",
  padding: "1em 1.5em",
  margin: "0 auto"
}));

export default function() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/links" component={LinksList}/>
        <Route path="/links/:linkId" component={LinkInfo}/>
        <Route path="/registration" component={Registration}/>
        <Route exact path="/login">
          {isAuthenticated ? <Redirect to={"/links"}/> : <Login/>}
        </Route>
      </Switch>
    </Router>
  );
}
