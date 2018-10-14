import {combineReducers} from 'redux'
import EventsReducer from './events.js'
import AuthenticationReducer from './authentication'

const reducers = {
  events: EventsReducer,
  authentication: AuthenticationReducer
}

export default combineReducers(reducers)
