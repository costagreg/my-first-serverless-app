import serverless from 'serverless-http'
import express from 'express'
import indexRoutes from './routes/index.js'

const app = new express()

const awsRegion = process.env.AWS_REGION || "us-east-1";

AWS.config.update({
  region: awsRegion,
});

const documentClient = new AWS.DynamoDB.DocumentClient();

app.use(indexRoutes(documentClient))

export const lambdaHandler = serverless(app)