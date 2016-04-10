import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import Layout from "./Layout.js";
import List from "./pages/List.js";
import Sample from "./pages/Sample.js";

const app = document.getElementById('app');

/* alternatively <Route path="/Sample" component={List}/> */
ReactDOM.render(<Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Sample}></IndexRoute>
    </Route>
  </Router>,app);