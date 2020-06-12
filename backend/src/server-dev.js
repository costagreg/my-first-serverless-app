import AWS from 'aws-sdk'
import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import indexRoutes from './routes'

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(indexRoutes)

app.listen(port, () => {
  console.log('Server started on port:' + port)
})
