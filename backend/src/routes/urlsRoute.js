import express from 'express'
import urlsController from '../controllers/urlsController'

const router = express.Router()

router.post('/api/url', urlsController.addUrl)
router.get('/:id', urlsController.getUrl)

export default router