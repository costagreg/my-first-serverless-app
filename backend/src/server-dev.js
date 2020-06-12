import AWS from 'aws-sdk'
import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import indexRoutes from './routes/index.js'

const app = express()
const port = process.env.PORT || 5000

const awsRegion = process.env.AWS_REGION || 'us-east-1'

AWS.config.update({
  region: awsRegion,
  endpoint: 'http://localhost:8000',
})

const documentClient = new AWS.DynamoDB.DocumentClient()

app.use(cors())
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(indexRoutes(documentClient))

app.listen(port, () => {
  console.log('Server started on port:' + port)
})
