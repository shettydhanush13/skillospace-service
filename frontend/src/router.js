import React from "react"
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "./styles.css"
import Home from "./pages/home"
import Register from "./pages/register"
import MyListing from "./pages/myListing"
import ProtectedRoute from "./protectedRoutes"

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/register" component={Register}/>
        <ProtectedRoute exact path="/my-listing" component={MyListing}/>
        <Route exact path="/*" component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
