
export const loginAttempt = () => ({type: 'AUTHENTICATION_LOGIN_ATTEMPT'})
export const loginFailure = (error) => ({type: 'AUTHENTICATION_LOGIN_FAILURE',error})
export const loginSuccess = (json) => ({type: 'AUTHENTICATION_LOGIN_SUCCESS',json})
export const logoutSuccess =() => ({type: 'AUTHENTICATION_LOGOUT_SUCCESS'})
export const logoutFailure = (json) => ({type: 'AUTHENTICATION_LOGOUT_FAILURE',json})

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
