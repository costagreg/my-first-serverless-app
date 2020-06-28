import { combineReducers } from 'redux'

import appConfig from './appConfig'
import shortener from './shortener'

export default combineReducers({appConfig, shortener })