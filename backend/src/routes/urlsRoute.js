import express from 'express'
import urlsController from '../controllers'

const router = express.Router()

router.post('/api/url', urlsController.addUrl)
router.get('/:id', urlsController.redirectUrl)

export default router