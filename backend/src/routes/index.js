import express from 'express'
import urlsRoute from './urlsRoute'

const router = express.Router()

router.use(urlsRoute)

export default router