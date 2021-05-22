import React from "react"
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Home from "./pages/home"

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/*" component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
