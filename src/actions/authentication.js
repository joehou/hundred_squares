
export const loginAttempt = () => ({type: 'AUTHENTICATION_LOGIN_ATTEMPT'})
export const loginFailure = () => ({type: 'AUTHENTICATION_LOGIN_FAILURE'})
export const loginSuccess = (json) => ({type: 'AUTHENTICATION_LOGIN_SUCCESS',json})

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
        console.log(response.status)
        return response.json()
      }
      return null
    }).then( (json) => {
      console.log(json)
      if (json){
        console.log('success')
        dispatch(loginSuccess(json))
      }else{
        dispatch(loginFailure(new Error('emai or password incorrect')))
        console.log('failure')
      }
    }).catch( (error) => {
        dispatch(loginFailure(new Error(error)))
    })
  }
}
