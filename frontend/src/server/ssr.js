import React from "react"
import AWS from "aws-sdk"
import ReactDOMServer from "react-dom/server"
import template from "./template"
import App from "../App"

export default () => (_, res) => {
  const myApp = <App />

  const html = ReactDOMServer.renderToString(myApp)

  return res.send(template(
    html,
    `/client.js`
  ))
}
