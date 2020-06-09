import React from "react";
import AWS from "aws-sdk";
import ReactDOMServer from "react-dom/server";
import template from "./template";
import App from "../App";

const S3_URL_ASSETS = `https://${process.env.S3_BUILD_URL}.s3.amazonaws.com/${process.env.NODE_ENV}/assets/`;

export default (_, isLambdaFunction) => (_, res) => {
  const myApp = <App />;
  const html = ReactDOMServer.renderToString(myApp);
  const bundleUrl = `${isLambdaFunction ? S3_URL_ASSETS :  '/'}client.js`
  const styleUrl = `${isLambdaFunction ? S3_URL_ASSETS :  '/'}styles.css`

  return res.send(template(html, bundleUrl, styleUrl));
};
