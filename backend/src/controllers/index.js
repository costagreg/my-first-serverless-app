import { documentClient, tableName } from '../db'
import urlsController from './urlsController'

export default urlsController(documentClient, tableName)
