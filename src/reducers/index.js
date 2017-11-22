import {combineReducers} from 'redux'
import * as types from '../actions/types'

function events ( state =initialState,action) {
  switch(action.type){
    case types.LOAD_EVENTS_SUCCESS:
      return{
        ...state
      }
    default:
      return state
  }
}

const initialState={
  events:{}
}

export default (events)