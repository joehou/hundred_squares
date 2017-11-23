import * as types from '../actions/types'

function events ( state =initialState,action) {
  switch(action.type){
    case types.LOAD_EVENTS_SUCCESS:
      return{
        ...state,
        events: action.events
      }
    default:
      return state
  }
}

function blocks (state=initialState, action) {
  switch(action.type){
    case types.LOAD_BLOCKS_SUCCESS:
      return{
        ...state,
        blocks: action.blocks
      }
    default:
      return state
  }
}

const initialState={
  events:{},
  blocks:[]
}



export default {events,blocks}