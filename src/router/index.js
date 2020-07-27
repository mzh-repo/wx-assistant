import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../pages/app";
import NotFound from "../pages/notFound";
import Search from "../pages/search";
import Result from "../pages/result";

const BasicRoute = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/search/:search" component={Search} />
      <Route exact path="/result/:search" component={Result} />
      <Route path="/*" component={NotFound} />
    </Switch>
  </Router>
);

export default BasicRoute;
