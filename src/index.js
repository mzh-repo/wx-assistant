import React from "react";
import ReactDOM from "react-dom";

import Routes from "./router/index";
import "./assets/styles/pages/index.less";

ReactDOM.render(
  // <React.StrictMode>
  <Routes />,
  // </React.StrictMode>,
  document.getElementById("root")
);
