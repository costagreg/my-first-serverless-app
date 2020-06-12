const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const config = require('./../../webpack.dev.config.js')

const app = express()
const compiler = webpack(config)
const port = process.env.PORT | 8080

app.use(express.static('static'))
app.use(
  webpackDevMiddleware(compiler, {
    serverSideRender: true,
  })
)

app.use(
  webpackHotMiddleware(
    compiler.compilers.find((compiler) => compiler.name === 'client')
  )
)
app.use(webpackHotServerMiddleware(compiler, { chunkName: 'm' }))

app.listen(port, () => {
  console.log(`dev server listening on port ${port}`)
})
