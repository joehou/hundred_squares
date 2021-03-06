import {getDummyGrid,getInitialBlocks} from "../utils/helpers";
import {fetchRecentGrid,postEvent,postNewEvent,deleteEditEvent} from "../utils/api"
import * as types from '../actions/types'

export function loadStarterGrid(){
  return (dispatch)=>{
    return dispatch({
      type: types.LOAD_EVENTS_SUCCESS,
      grid: getDummyGrid()
    })
  }
}

export function ResetGrid(){
  return dispatch =>
    dispatch({
      type:types.RESET_GRID
    })
}

export function loadUserEvents(user){
  console.log(`in load user event action ${user}`)
  return (dispatch)=>{
    return fetchRecentGrid(user).then(grid => {
    console.log(grid.events)
      dispatch({
      type: types.LOAD_EVENTS_SUCCESS,
      grid: grid
    })
  })
  }

}

export function loadBlocks(){
  return(dispatch) =>{
    return dispatch({
      type: types.LOAD_BLOCKS_SUCCESS,
      blocks: getUserBlocks()
    })
  }
}

export function loadStarterBlocks(){
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

export function deleteEvent(editEvent,username,grid){
    return dispatch =>{
        return deleteEditEvent(editEvent,username,grid).then(event => {
            dispatch({
                type: types.DELETE_EDIT_EVENT,
                editEvent
            })

        })
    }
}

export function createEvent(newEvent,username,grid){
  return dispatch=>{
      return postNewEvent(newEvent,username,grid).then(event =>{
        console.log(event)
        dispatch({
          type: types.CREATE_EDIT_EVENT,
          newEvent,
          event
        })
      })
  }
}

export function updateEvent(newEvent,username,grid){
  return dispatch=>{
    return postEvent(newEvent,username,grid).then(event =>{
        dispatch({
          type: types.UPDATE_EVENT,
          newEvent
        })
    })
  }
}

export function reloadUserEvents(user){
  console.log(`in load user event action ${user}`)
  return (dispatch)=>{
    return fetchRecentGrid(user).then(grid => {
    console.log(grid.events)
      dispatch({
      type: types.LOAD_EVENTS_SUCCESS,
      grid: grid
    })
  })
  }

}
