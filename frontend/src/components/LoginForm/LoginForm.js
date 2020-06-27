import React from 'react'
import PropTypes from 'prop-types'

import './LoginForm.scss'

const LoginForm = (props) => {
  return (
    <div className="loginForm">
      <form className="loginForm__formContainer">
      <p>Signup to track your link!</p>
        <input className="loginForm__email" placeholder="Email" />
        <input className="loginForm__password" placeholder="Password" />
        <div className="loginForm__buttons">
          <button  className="loginForm__loginButton">Login</button>
          <button  className="loginForm__signupButton">Signup</button>
        </div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {}

export default LoginForm
