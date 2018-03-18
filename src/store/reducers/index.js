import { combineReducers } from 'redux'
import { setDisc } from './setDisc'

export const rootReducers = combineReducers({
  disc: setDisc
})
