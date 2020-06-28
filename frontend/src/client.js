import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'

import App from './App'

const preloadedStore = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

const store = createStore(
  rootReducer,
  preloadedStore,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
      : (mockFunction) => mockFunction
  )
)

const render = () => {
  hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
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
