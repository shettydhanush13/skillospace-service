import React from "react"
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "./styles.css"
import Home from "./pages/home"
import Register from "./pages/register"

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/*" component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
