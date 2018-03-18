import { createStore, applyMiddleware } from 'redux'
import { rootReducers } from './reducers'
import logger from 'redux-logger'

export default createStore(rootReducers, applyMiddleware(logger))
