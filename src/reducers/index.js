import * as types from '../actions/types'

function events ( state =initialState,action) {
  switch(action.type){
    case types.LOAD_EVENTS_SUCCESS:
      return{
        ...state,
        events: action.events
      }
    case types.RESET_EDIT_EVENT:
      return {
        ...state,
        editEvent: blankEvent
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
  blocks:[],
  editEvent:blankEvent
}

const blankEvent={
    eventId:1,
    eventName: "Shower",
    eventColor: "#42AB9E",
    eventFontColor: "white",
    startBlock: 0,
    endBlock:  5,
}

export default {events,blocks}