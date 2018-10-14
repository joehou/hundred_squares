const initialState = {
  isLoggedIn: false,
  isLoggingIn: false
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'AUTHENTICATION_LOGIN_FAILURE':
      {
        const newState = Object.assing({}, initialState)    
        return newState;
      } 
    default:
      return state
  } 
}
