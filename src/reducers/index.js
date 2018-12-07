import {combineReducers} from 'redux'
import EventsReducer from './events.js'
import ErrorReducer from './error'
import AuthenticationReducer from './authentication'

const reducers = {
  error:ErrorReducer,
  events: EventsReducer,
  authentication: AuthenticationReducer
}

export default combineReducers(reducers)
