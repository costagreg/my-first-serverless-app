const initialState = {
  error: '',
}

function signupReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SIGNUP_ERROR':
      return {
        ...state,
        error: action.error,
      }

    case 'SET_SIGNUP_SUCCESS':
      return { ...state, user: action.user }
  }

  return state
}

export default signupReducer
