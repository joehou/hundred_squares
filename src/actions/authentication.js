
export const loginAttempt = () => ({type: 'AUTHENTICATION_LOGIN_ATTEMPT'})
export const loginFailure = () => ({type: 'AUTHENTICATION_LOGIN_FAILURE'})
export const logingSuccess = () => ({type: 'AUTHENTICATION_LOGIN_SUCCESS'})

export function logUserIn(userData) {
  return (dispatch) => {
    dispatch(loginAttempt())
  }
}
