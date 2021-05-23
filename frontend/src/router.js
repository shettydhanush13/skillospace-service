import React, { lazy, Suspense  } from "react"
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "./styles.css"
import Home from "./pages/home"
import Register from "./pages/register"
import ProtectedRoute from "./protectedRoutes"

const MyListing = lazy(() => import("./pages/myListing")) 

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/register" component={Register}/>
        <Suspense fallback={() => <div>Loading...</div>}>
          <ProtectedRoute exact path="/my-listing" component={MyListing}/>
        </Suspense>
        <Route exact path="/*" component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
