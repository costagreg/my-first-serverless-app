import React from "react"
import { hydrate } from "react-dom"
import App from "./App"

const render = () => {
  hydrate(<App />, document.getElementById("root"));
};

render();

if (module.hot) {
  module.hot.accept('./App.js', () => {
    const NextApp = require('./App').default;
    render(NextApp)
  })
}