const initialState = {
  isError: false,
  error: {}
}

export default function reducer(state = initialState, action)
{
  switch (action.type) {
    case 'AUTHENTICATION_LOGIN_FAILURE':
      {
        const newState = Object.assign({},initialState)
        newState.isError = true
        newState.error = action.error
        return newState
      }
    case 'ERROR_CLEARED':
      {
        const newState = Object.assign({}, initialState)
        return newState
      }
    default: {
      return state
    }
  }
}
