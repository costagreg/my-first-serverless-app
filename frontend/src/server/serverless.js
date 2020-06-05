import serverless from 'serverless-http'
import express from 'express'
import ssr from './ssr'

const app = new express()

app.get('/', (req, res) => {
    return ssr(req, res)
})

export const lambdaHandler = serverless(app)