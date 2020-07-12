import React from 'react'
import PropTypes from 'prop-types'
import useInput from '../../hooks/useInput'

import './LoginForm.scss'

const LoginForm = ({ login }) => {
  const { emailValue, emailBindInput } = useInput('email')
  const { passwordValue, passwordBindInput } = useInput('password')

  return (
    <div className="loginForm">
      <form className="loginForm__formContainer" onSubmit={(e) => {
        login(emailValue, passwordValue)
        e.preventDefault()
      }}>
        <input
          {...emailBindInput}
          type="email"
          className="loginForm__email"
          placeholder="Email"
        />
        <input
          {...passwordBindInput}
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
}

LoginForm.propTypes = {}

export default LoginForm
