const serverless = require('serverless-http')
const express = require('express')
const ssr = require('./ssr')
const app = new express()

app.get('/', (req, res) => {
    const html = ssr()
    res.send(html)
})

app.post('/', (req, res) => {
    res.send('Hello World')
})


module.exports.lambdaHandler = serverless(app)