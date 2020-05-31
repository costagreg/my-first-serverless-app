const React = require("react");
const { hydrate } = require("react-dom");
const Dashboard = require("./Dashboard");

const render = () => {
  hydrate(<Dashboard />, document.getElementById("root"));
};

render();