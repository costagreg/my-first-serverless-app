import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../reducers'
import template from './template'
import App from '../App'

const lambdaEnv = process.env.AWS_SAM_LOCAL ? 'local' : 'prod'

const S3_URL_ASSETS = `https://${process.env.S3_BUILD_URL}.s3.amazonaws.com/${lambdaEnv}/assets/`

export default (_, isLambda) => (req, res) => {
  const bundleUrl = `${isLambda ? S3_URL_ASSETS : '/'}client.js`
  const styleUrl = `${isLambda ? S3_URL_ASSETS : '/'}styles.css`
  const { lambdaApiUrl, isLambdaProd } = req

  const appConfig = {
    apiUrl: isLambda ? lambdaApiUrl : process.env.API_DEV_URL,
    isLambda: isLambda || false,
    isLambdaProd: isLambdaProd || false,
    userPoolId: process.env.USER_POOL_ID || process.env.USER_POOL_ID_DEV,
    userPoolClientId:
      process.env.USER_POOL_CLIENT_ID || process.env.USER_POOL_CLIENT_ID_DEV,
  }

  const store = createStore(rootReducer, {
    appConfig,
  })

  const myApp = (
    <Provider store={store}>
      <App />{' '}
    </Provider>
  )

  const preloadedState = store.getState()


  const markup = ReactDOMServer.renderToString(myApp)

  return res.send(template({ markup, bundleUrl, styleUrl, preloadedState }))
}
