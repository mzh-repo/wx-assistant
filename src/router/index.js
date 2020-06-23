import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../pages/app";
import NotFound from "../pages/notFound";
import Search from "../pages/search";

const BasicRoute = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/*" component={NotFound} />
    </Switch>
  </Router>
);

export default BasicRoute;
