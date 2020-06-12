import AWS from 'aws-sdk'
import serverless from 'serverless-http'
import express from 'express'
import bodyParser from 'body-parser'
import indexRoutes from './routes/index.js'

AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1',
})

const app = new express()
const documentClient = new AWS.DynamoDB.DocumentClient()

app.use(bodyParser.json())
app.use(indexRoutes(documentClient))

export const lambdaHandler = serverless(app)
