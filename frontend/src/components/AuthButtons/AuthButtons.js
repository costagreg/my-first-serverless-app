import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './AuthButtons.scss'

const AuthButtons = ({ isLogin, setIsLogin }) => (
  <div className="authButtons">
    <button
      className={classNames('authButtons__login', {
        'authButtons__login--active': isLogin,
      })}
      onClick={() => setIsLogin(true)}
    >
      Login
    </button>
    <button
      className={classNames('authButtons__signup', {
        'authButtons__signup--active': !isLogin,
      })}
      onClick={() => setIsLogin(false)}
    >
      Signup
    </button>
  </div>
)

AuthButtons.propTypes = {
  setIsLogin: PropTypes.func,
}

export default AuthButtons
