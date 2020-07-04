import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import HomePageView from '../../components/HomePageView'
import { shortUrl } from '../../actions/shortener'

const mapToProps = (state) => ({
  error: state.shortener.error,
  urlShortened: state.shortener.urlShortened,
})

export const HomePage = ({ shortUrl, error, urlShortened }) => (
  <HomePageView error={error} shortUrl={shortUrl} urlShortened={urlShortened} />
)

HomePage.propTypes = {
  shortUrl: PropTypes.func,
  error: PropTypes.string,
  urlShortened: PropTypes.string,
}

export default connect(mapToProps, { shortUrl })(HomePage)
