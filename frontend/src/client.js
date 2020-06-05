import React from "react"
import { hydrate } from "react-dom"
import App from "./App"

const render = () => {
  hydrate(<App />, document.getElementById("root"));
};

render();