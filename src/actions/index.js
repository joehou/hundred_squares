import {getDummyEvents,getInitialBlocks} from "../utils/helpers";
import * as types from '../actions/types'

export function loadEvents(){
  return (dispatch)=>{
    return dispatch({
      type: types.LOAD_EVENTS_SUCCESS,
      events: getDummyEvents()
    })
  }
}

export function loadBlocks(){
  return(dispatch) =>{
    return dispatch({
      type: types.LOAD_BLOCKS_SUCCESS,
      blocks: getInitialBlocks()
    })
  }
}

export function resetEditEvent(){
  return dispatch =>
    dispatch({
      type:types.RESET_EDIT_EVENT
    })
}

export function getEditEvent(eventID){
  return dispatch =>
    dispatch({
      type:types.GET_EDIT_EVENT,
      eventID: eventID
    })
}

export function setEditEvent(startBlock,endBlock){
  return dispatch =>
    dispatch({
      type:types.SET_EDIT_EVENT,
      highlightRange: {startBlock,endBlock}
    })
}

export function updateEditEvent(update){
  return dispatch=>{
    dispatch({
      type: types.UPDATE_EDIT_EVENT,
      update
    })
  }
}

export function createEvent(event){
  return dispatch=>{
    dispatch({
      type: types.CREATE_EDIT_EVENT,
      event
    })
  }
}

export function updateEvent(event){
  return dispatch=>{
    dispatch({
      type: types.UPDATE_EVENT,
      event
    })
  }
}