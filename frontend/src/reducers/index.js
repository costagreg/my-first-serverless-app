import { combineReducers } from 'redux'

import appConfig from './appConfig'
import shortener from './shortener'
import signup from './signup'
import login from './login'

export default combineReducers({ appConfig, shortener, signup, login})
