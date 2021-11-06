import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import MonkeyCompilerIDE from "./components/MonkeyCompilerIDE";

ReactDOM.render(
  <React.StrictMode>
    <MonkeyCompilerIDE />
  </React.StrictMode>,
  document.getElementById("root")
);
