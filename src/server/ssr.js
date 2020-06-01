import React from 'react'
import ReactDOMServer from 'react-dom/server'
import template from './template'
import App from '../App'

export default () => {
  const myApp = <App />;

  const html = ReactDOMServer.renderToString(myApp);

  return template(
    html,
    `https://${process.env.S3_BUILD_URL}.s3.amazonaws.com/${process.env.NODE_ENV}/assets/client.js`
  );
};
