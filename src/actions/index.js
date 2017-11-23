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