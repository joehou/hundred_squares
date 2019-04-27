import * as types from '../actions/types'
import {getDummyGrid,getInitialBlocks} from "../utils/helpers";


const initialGrid=getDummyGrid()

export default function reducer( state =initialState,action) {
  switch(action.type){
    case 'AUTHENTICATION_LOGOUT_SUCCESS':
      console.log('in event reducrer after logout')
      return{
        ...state,
        grid: initialGrid,
        events: initialGrid.events
      }
    case types.LOAD_BLOCKS_SUCCESS:
      return{
        ...state,
        blocks: action.blocks
      }
    case types.LOAD_EVENTS_SUCCESS:
      console.log(`grid in action ${action.grid}`)
      return{
        ...state,
        grid: action.grid,
        events: action.grid.events,
      }
    case types.RESET_EDIT_EVENT:
      return {
        ...state,
        editEvent: blankEvent
      }
    case types.SET_EDIT_EVENT:
      return {
        ...state,
        editEvent: {...state.editEvent,startBlock:action.highlightRange.startBlock+1,endBlock:action.highlightRange.endBlock}
      }
    case types.GET_EDIT_EVENT:
      console.log(action.eventID)
      return {
        ...state,
        editEvent: state.events.find(event=> event.eventID==action.eventID)
      }
    case types.UPDATE_EDIT_EVENT:
      return {
        ...state,
        editEvent: {...state.editEvent,[action.update.propertyName]: action.update.value}
      }
    case types.CREATE_EDIT_EVENT:
      console.log(state.blocks)
      return {
        ...state,
        events: [...state.events,action.event],
        blocks: state.blocks.map(block=>{
          console.log("Checkin in reducers")
          if (block.id ==action.event.startBlock){
            return {...block, eventID:99}
          }else{
            return block
          }

        }),
        editEvent: blankEvent
      }
    case types.UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map(event=>{
          if (event.eventID===action.event.eventID){
            return action.event
          }else{
            return event
          }
        }),
        editEvent: blankEvent
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
    eventID:null,
    eventName: "",
    eventColor: "",
    eventFontColor: "",
    startBlock: null,
    endBlock:  null,
}
