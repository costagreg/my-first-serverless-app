import React from "react";
import AWS from "aws-sdk";
import ReactDOMServer from "react-dom/server";
import template from "./template";
import App from "../App";

export default (_, isLambdaFunction) => (_, res) => {
  const myApp = <App />;

  console.log(isLambdaFunction)

  const html = ReactDOMServer.renderToString(myApp);
  const bundleUrl = isLambdaFunction
    ? `https://${process.env.S3_BUILD_URL}.s3.amazonaws.com/${process.env.NODE_ENV}/assets/client.js`
    : '/client.js';

  return res.send(template(html, bundleUrl));
};
