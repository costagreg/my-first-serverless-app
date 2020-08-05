const initialState = {
  error: '',
  user: '',
}

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOGIN_ERROR':
      return {
        ...state,
        error: action.error,
      }

    case 'SET_LOGIN_USER':
      return { ...state, user: action.user }
  }

  return state
}

export default loginReducer
