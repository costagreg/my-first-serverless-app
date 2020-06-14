import React from 'react'
import ReactDOMServer from 'react-dom/server'
import template from './template'
import App from '../App'

const lambdaEnv = process.env.AWS_SAM_LOCAL ? 'local' : 'prod'

const S3_URL_ASSETS = `https://${process.env.S3_BUILD_URL}.s3.amazonaws.com/${lambdaEnv}/assets/`

export default (_, isLambda) => (req, res) => {
  const bundleUrl = `${isLambda ? S3_URL_ASSETS : '/'}client.js`
  const styleUrl = `${isLambda ? S3_URL_ASSETS : '/'}styles.css`
  const { lambdaApiUrl, isLambdaProd } = req

  const appConfig = {
    apiUrl: isLambda ? lambdaApiUrl : process.env.API_DEV_URL ,
    isLambda: isLambda || false,
    isLambdaProd: isLambdaProd || false,
  }

  const myApp = <App appConfig={appConfig} />
  const markup = ReactDOMServer.renderToString(myApp)

  return res.send(template({ markup, bundleUrl, styleUrl, appConfig }))
}
