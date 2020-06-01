import serverless from 'serverless-http'
import express from 'express'
import ssr from './ssr'

const app = new express()

app.get('/', (req, res) => {
    const html = ssr()
    res.send(html)
})

app.post('/', (req, res) => {
    res.send('Hello World')
})


export const lambdaHandler = serverless(app)