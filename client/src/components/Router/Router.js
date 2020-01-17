import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {styled} from "baseui";

import {AuthContext} from "../Providers/AuthProvider";
import Home from '../screens/Home';
import LinksList from '../screens/Link/LinksList';
import Login from '../screens/Login';
import Registration from '../screens/Registration';

const SyledRouter = styled("div", () => ({
  flexGrow: "1",
  maxWidth: "1280px",
  width: "100%",
  padding: "1em 1.5em",
  margin: "0 auto"
}));

export default function Router() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <SyledRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/links" component={LinksList}/>
        <Route path="/registration" component={Registration}/>
        <Route exact path="/login">
          {isAuthenticated ? <Redirect to={"/links"}/> : <Login/>}
        </Route>
      </Switch>
    </SyledRouter>
  );
}
