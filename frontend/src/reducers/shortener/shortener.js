const initialState = {
  error: '',
  url: '',
}

function shortenerReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SHORTENER_ERROR':
      return {
        ...state,
        error: action.error,
      }

    case 'SET_SHORTENER_URL':
      return { ...state, error: '', urlShortened: action.urlShortened }
  }

  return state
}

export default shortenerReducer
