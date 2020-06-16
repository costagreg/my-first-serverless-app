import serverless from 'serverless-http'
import express from 'express'
import ssr from './ssr'

const app = new express()

const isLambdaProd = (event) => {
  const host = event.headers.Host
  const stage = event.requestContext.stage
  const isLocalLambda = process.env.AWS_SAM_LOCAL

  return !isLocalLambda && host !== '127.0.0.1:3000' && stage === 'Prod'
}

const lambdaApiUrl = (event) => {
  const host = event.headers.Host

  return isLambdaProd(event) ? `https://${host}` : `http://127.0.0.1:3000`
}

app.get('/', (req, res) => {
  const response = ssr([], true)

  return response(req, res)
})

export const lambdaHandler = serverless(app, {
  request: function (req, event, context) {
    req.isLambdaProd = isLambdaProd(event)
    req.lambdaApiUrl = lambdaApiUrl(event)
  },
})
