import {getDummyData} from "../utils/helpers";
import * as types from '../actions/types'

export function loadEvents(){
  return (dispatch)=>{
    dispatch({
      type: types.LOAD_EVENTS_SUCCESS,
      events: getDummyData()
    })
  }
}
