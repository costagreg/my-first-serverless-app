import React, { useState } from 'react'
import UrlInputForm from '../../components/UrlInputForm'
import UrlShortenerOutput from '../../components/UrlShortenerOutput'
import axios from 'axios'

const HomePage = ({ appConfig = {} }) => {
  const { apiUrl } = appConfig
  const [error, setError] = useState('')
  const [urlShortened, setUrlShortened] = useState('')

  const createUrl = (url) => {
    axios
      .post(`${apiUrl}/api/url`, {
        url,
      })
      .then(({ data: responseData }) => {
        const { data } = responseData
        const { id } = data

        setUrlShortened(`${apiUrl}/${id}`)
      })
      .catch((error) => {
        setError(error)
      })
  }

  return (
    <div>
      <center>
        <h2>URL Shortener!</h2>
        <p>Simply copy & paste your link and click the cut button!</p>
      </center>
      <UrlInputForm createUrl={createUrl} error={error} />
      <UrlShortenerOutput error={error} urlShortened={urlShortened} />
    </div>
  )
}

export default HomePage
