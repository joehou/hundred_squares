import * as types from '../actions/types'
import {getDummyGrid,getInitialBlocks,getBlocks} from "../utils/helpers";


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
      return{
        ...state,
        blocks: getBlocks(action.grid.events),
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
      return {
        ...state,
        editEvent: state.grid.events.find(event=> event._id==action.eventID)
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
        grid: {...state.grid,events:[...state.grid.events,action.newEvent]},
        blocks: state.blocks.map(block=>{
          if (block.id ==action.newEvent.startBlock){
            return {...block, eventID:action.newEvent._id}
          }else{
            return block
          }

        }),
        editEvent: blankEvent
      }
    case types.UPDATE_EVENT:
      return {
        ...state,
        grid: {...state.grid,events: state.grid.events.map(event=>{
          if (event._id===action.newEvent._id){
            return action.newEvent
          }else{
            return event
          }
        })},
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
