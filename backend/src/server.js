import serverless from 'serverless-http'
import express from 'express'
import bodyParser from 'body-parser'
import indexRoutes from './routes'

const app = new express()

app.use(bodyParser.json())
app.use(indexRoutes)

export const lambdaHandler = serverless(app)
