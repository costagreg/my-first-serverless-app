import React from 'react'
import PropTypes from 'prop-types'
import UrlInputForm from '../UrlInputForm'
import UrlShortenerOutput from '../UrlShortenerOutput'
import Auth from '../../containers/Auth'

import './homePageView.scss'

const HomePageView = ({ shortUrl, urlShortened, error }) => (
  <div className="homePageView homePageView--initialState">
    <center>
      <h2>URL Shortener!</h2>
      <p>Simply copy & paste your link and click the cut button!</p>
    </center>
    <UrlInputForm shortUrl={shortUrl} error={error} />
    <UrlShortenerOutput error={error} urlShortened={urlShortened} />
    <Auth />
  </div>
)

HomePageView.propTypes = {
  shortUrl: PropTypes.func,
  error: PropTypes.string,
  urlShortened: PropTypes.string,
}

export default HomePageView
