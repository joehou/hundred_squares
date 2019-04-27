import { fetchRecentGrid } from '../utils/api'
export const loginAttempt = () => ({type: 'AUTHENTICATION_LOGIN_ATTEMPT'})
export const loginFailure = (error) => ({type: 'AUTHENTICATION_LOGIN_FAILURE',error})
export const loginSuccess = (json) => ({type: 'AUTHENTICATION_LOGIN_SUCCESS',json})
export const logoutSuccess =() => ({type: 'AUTHENTICATION_LOGOUT_SUCCESS'})
export const logoutFailure = (json) => ({type: 'AUTHENTICATION_LOGOUT_FAILURE',json})
export const sessionCheckFailure = () => ({type: 'AUTHENTICATION_SESSION_CHECK_FAILURE'});
export const sessionCheckSuccess = json => ({type: 'AUTHENTICATION_SESSION_CHECK_SUCCESS', json});


export function logUserIn(userData) {
  return async (dispatch) => {
    dispatch(loginAttempt())

    await fetch(
      '/api/authentication/login',
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
      },
    ).then( (response) => {
      if (response.status === 200) {
        return response.json()
      }
      return null
    }).then( (json) => {
      if (json){
        dispatch(loginSuccess(json))
      }else{
        dispatch(loginFailure(new Error('emai or password incorrect')))
      }
    }).catch( (error) => {
        dispatch(loginFailure(new Error(error)))
    })
  }
}

export function logUserOut() {
  return async (dispatch) => {
    await fetch(
      '/api/authenticaiton/logout',
      {
        method: 'GET',
        credentials: 'same-origin'
      }
    ).then( (response) => {
      if (response.status ===200) {
        dispatch(logoutSuccess())
      }else{
        dispatch( logoutFailure(new Error(response.status)))
      }
    })
  }
}

export function checkSession() {
  return async (dispatch) => {
    // contact the API
    await fetch(
      // where to contact
      '/api/authentication/checksession',
      // what to send
      {
        method: 'GET',
        credentials: 'same-origin',
      },
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json) => {
        if (json.username) {
          dispatch(sessionCheckSuccess(json));
          //    dispatch(reLoadUserEvents())
        }else{
          return dispatch(sessionCheckFailure());
        }
      })
      .catch((error) => dispatch(sessionCheckFailure(error)));
      console.log("checking session")
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
