const initialState = {
  error: '',
  user: '',
}

function signupReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SIGNUP_ERROR':
      return {
        ...state,
        error: action.error,
      }
  }

  return state
}

export default signupReducer
