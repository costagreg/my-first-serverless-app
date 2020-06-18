import React, { useState } from 'react'
import UrlInputForm from '../../components/UrlInputForm'
import UrlShortenerOutput from '../../components/UrlShortenerOutput'
import axios from 'axios'

const HomePage = ({ appConfig = {} }) => {
  const { apiUrl } = appConfig
  const [error, setError] = useState('')
  const [urlShortened, setUrlShortened] = useState('')

  const createUrl = (url) =>
    axios
      .post(`${apiUrl}/api/url`, {
        url,
      })
      .then(({ data }) => {
        const { result } = data
        const { id } = result

        setUrlShortened(`${apiUrl}/${id}`)
      })
      .catch((error) => {
        // setError(error)
        console.log(error)
      })

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
