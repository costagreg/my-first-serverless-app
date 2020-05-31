const React = require('react')
const ReactDOMServer = require('react-dom/server')
const template = require('./template')
const Dashboard = require('./Dashboard')

module.exports = () => {
  const myApp = <Dashboard/>

  const html = ReactDOMServer.renderToString(myApp)

  return template(html, 'https://serverlessreactapptest.s3.amazonaws.com/assets/client.js')
}
