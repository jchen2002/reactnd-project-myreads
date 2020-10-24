import React from "react";
import ReactDOM from "react-dom";
//import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import MyBookApp from "./MyBookApp";

ReactDOM.render(
  <BrowserRouter>
    <MyBookApp />
  </BrowserRouter>,
  document.getElementById("root")
);
