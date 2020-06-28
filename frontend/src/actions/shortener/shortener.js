import { isValidUrl, sanitiseUrl } from '../../helpers/urlHelpers'
import axios from 'axios'

export const shortUrl = (url) => (dispatch, getState) => {
  const state = getState()
  const { apiUrl } = state.appConfig
  if (isValidUrl(url)) {
    axios
      .post(`${apiUrl}/api/url`, {
        url: sanitiseUrl(url),
      })
      .then(({ data }) => {
        const { result } = data
        const { id } = result
        dispatch({
          type: 'SET_SHORTENER_URL',
          urlShortened: `${apiUrl}/${id}`
        })

      })
      .catch((error) => {
        dispatch({
          type: 'SET_SHORTENER_ERROR',
          error: 'Ops something went wrong',
        })
      })
  } else {
    dispatch({
      type: 'SET_SHORTENER_ERROR',
      error: 'Url not valid',
    })
  }
}
