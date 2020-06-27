import React, { useState } from 'react'
import HomePageView from '../../components/HomePageView'
import { isValidUrl, sanitiseUrl } from '../../helpers/urlHelpers'
import axios from 'axios'

const HomePage = ({ appConfig = {} }) => {
  const { apiUrl } = appConfig
  const [error, setError] = useState('')
  const [urlShortened, setUrlShortened] = useState('')

  const createUrl = (url) => {
    if (isValidUrl(url)) {
      axios
        .post(`${apiUrl}/api/url`, {
          url: sanitiseUrl(url),
        })
        .then(({ data }) => {
          const { result } = data
          const { id } = result

          setError('')
          setUrlShortened(`${apiUrl}/${id}`)
        })
        .catch((error) => {
          setError('Ops something went wrong')
        })
    } else {
      setError('Url not valid')
    }
  }

  return (
    <HomePageView
      createUrl={createUrl}
      error={error}
      urlShortened={urlShortened}
    />
  )
}

export default HomePage
