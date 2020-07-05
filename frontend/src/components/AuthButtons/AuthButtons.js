import React from 'react'
import PropTypes from 'prop-types'

import './AuthButtons.scss'

const AuthButtons = ({ setShowLogin }) => (
  <div className="authButtons">
    <button className="authButtons__login" onClick={() => setShowLogin(true)}>
      Login
    </button>
    <button className="authButtons__signup" onClick={() => setShowLogin(false)}>
      Signup
    </button>
  </div>
)

AuthButtons.propTypes = {
  setShowLogin: PropTypes.func,
}

export default AuthButtons
