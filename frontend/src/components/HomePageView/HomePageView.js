import React from 'react'
import UrlInputForm from '../../components/UrlInputForm'
import UrlShortenerOutput from '../../components/UrlShortenerOutput'
import LoginForm from '../../components/LoginForm'

import './homePageView.scss'

const HomePageView = ({ createUrl, urlShortened, error }) => (
  <div className="homePageView homePageView--initialState">
    <center>
      <h2>URL Shortener!</h2>
      <p>Simply copy & paste your link and click the cut button!</p>
    </center>
    <UrlInputForm createUrl={createUrl} error={error} />
    <UrlShortenerOutput error={error} urlShortened={urlShortened} />
    {urlShortened && <LoginForm />}
    {/* <LoginForm/> */}
  </div>
)

HomePageView.propTypes = {}

export default HomePageView
