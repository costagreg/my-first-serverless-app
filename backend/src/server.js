import serverless from 'serverless-http'
import express from 'express'
import indexRoutes from './routes/index.js'

const app = new express()

app.use(indexRoutes)

export const lambdaHandler = serverless(app)