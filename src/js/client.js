import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import Layout from "./Layout.js";
import List from "./pages/List.js";
import Page2 from "./pages/Page2.js";

const app = document.getElementById('app');

ReactDOM.render(<Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Page2}></IndexRoute>
      <Route path="/page2" component={List}/>
    </Route>
  </Router>,app);