import React from 'react'
import { hydrate } from 'react-dom'
import App from './App'

const { appConfig = '{}' } = window
delete window.appConfig

const render = () => {
  hydrate(
    <App appConfig={JSON.parse(appConfig)} />,
    document.getElementById('root')
  )
}

render()

if (module.hot) {
  module.hot.accept('./App.js', () => {
    const NextApp = require('./App').default
    render(NextApp)
  })
}
