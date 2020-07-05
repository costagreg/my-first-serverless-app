import { combineReducers } from 'redux'

import appConfig from './appConfig'
import shortener from './shortener'
import signup from './signup'

export default combineReducers({ appConfig, shortener, signup })
