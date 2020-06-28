import React from 'react'
import { connect } from 'react-redux'
import UrlInputForm from '../../components/UrlInputForm'
import UrlShortenerOutput from '../../components/UrlShortenerOutput'
import LoginForm from '../../components/LoginForm'
import { shortUrl } from '../../actions/shortener'

import './homePageView.scss'

const mapToProps = (state) => ({
  error: state.shortener.error,
  urlShortened: state.shortener.urlShortened,
})

const HomePageView = ({ shortUrl, urlShortened, error }) => (
  <div className="homePageView homePageView--initialState">
    <center>
      <h2>URL Shortener!</h2>
      <p>Simply copy & paste your link and click the cut button!</p>
    </center>
    <UrlInputForm shortUrl={shortUrl} error={error} />
    <UrlShortenerOutput error={error} urlShortened={urlShortened} />
    <LoginForm />
  </div>
)

HomePageView.propTypes = {}

export default connect(mapToProps, { shortUrl })(HomePageView)
