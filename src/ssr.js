const React = require("react");
const ReactDOMServer = require("react-dom/server");
const template = require("./template");
const Dashboard = require("./Dashboard");

module.exports = () => {
  const myApp = <Dashboard />;

  const html = ReactDOMServer.renderToString(myApp);

  return template(
    html,
    `https://${process.env.S3_BUILD_URL}.s3.amazonaws.com/${process.env.NODE_ENV}/assets/client.js`
  );
};
