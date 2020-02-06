import * as types from '../actions/types'
import {getDummyGrid,getInitialBlocks,getBlocks,closeGaps} from "../utils/helpers";


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
      let id = action.event ? action.event._id : action.newEvent._id
      let eventToAdd = action.event? action.event : action.newEvent
      return {
        ...state,
        grid: {...state.grid,events:[...state.grid.events,eventToAdd]},
        blocks: state.blocks.map(block=>{
          if (block.id >=eventToAdd.startBlock && block.id<= eventToAdd.endBlock){
            return {...block, eventID:id,_id:id}
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
    case types.DELETE_EDIT_EVENT:
          return {
            ...state,
              grid: {...state.grid,
                events: closeGaps(state.grid.events.filter(event=>{
                    return event._id !== action.editEvent._id
                  })
                )},
            editEvent: blankEvent,
            blocks: getBlocks(state.grid.events),
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
