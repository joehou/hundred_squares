const initialState = {
  isLoggedIn: false,
  isLoggingIn: false
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'AUTHENTICATION_LOGIN_ATTEMPT': {
      const newState = Object.assign({}, state);
      newState.isLoggingIn = true;
      return newState;
    }
    case 'AUTHENTICATION_LOGIN_FAILURE':
    case 'AUTHENTICATION_SESSION_CHECK_FAILURE':
    case 'AUTHENTICATION_LOGOUT_SUCCESS':
    case 'AUTHENTICATION_REGISTRATION_FAILURE': {
      console.log('in auth reducrer after logout')
      const newState = Object.assign({}, initialState);
      return newState;
    }
    case 'AUTHENTICATION_LOGIN_SUCCESS':
    case 'AUTHENTICATION_SESSION_CHECK_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.firstName = action.json.firstName;
      newState.id = action.json._id;
      newState.isLoggedIn = true;
      newState.isLoggingIn = false;
      newState.lastName = action.json.lastName;
      newState.username = action.json.username;
      return newState;
    }
    case 'AUTHENTICATION_REGISTRATION_SUCCESS': {
      const newState = Object.assign({},state)
      newState.registrationSucceeded = true;
      return newState
    }
    case 'AUTHENTICATION_REGISTRATION_VIEWED': {
      const newState = Object.assign({},state);
      newState.registrationSucceeded = false;
      return newState;
    }
    case 'AUTHENTICATION_PASSWORD_RESET_CLEAR':
    case 'AUTHENTICATION_PASSWORD_RESET_HASH_FAILURE': {
      const newState = Object.assign({}, state);
      newState.isPasswordReset = false;
      return newState;
    }
    case 'AUTHENTICATION_PASSWORD_SAVE_CLEAR': {
      const newState = Object.assign({}, state);
      newState.isPasswordChanged = false;
      return newState;
    }
    case 'AUTHENTICATION_PASSWORD_SAVE_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.isPasswordChanged = true;
      return newState;
    }
    case 'AUTHENTICATION_PASSWORD_RESET_HASH_CREATED': {
      const newState = Object.assign({}, state);
      newState.isPasswordReset = true;
      return newState;
    }
    default: {
      return state;
    }
  }
}
