import React from 'react'
import PropTypes from 'prop-types'

import './LoginForm.scss'

const LoginForm = (props) => (
  <div className="loginForm">
    <h3>Login</h3>
    <form className="loginForm__formContainer">
      <input type="email" className="loginForm__email" placeholder="Email" />
      <input
        type="password"
        className="loginForm__password"
        placeholder="Password"
      />
      <div className="loginForm__buttons">
        <button className="loginForm__submit">Login</button>
      </div>
    </form>
  </div>
)

LoginForm.propTypes = {}

export default LoginForm
