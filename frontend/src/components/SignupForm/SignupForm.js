import React from 'react'
import PropTypes from 'prop-types'
import useInput from '../../hooks/useInput'

import './SignupForm.scss'

const SignupForm = ({ signup }) => {
  const { emailValue, emailBindInput } = useInput('email')
  const { passwordValue, passwordBindInput } = useInput('email')

  const handleSubmit = (evt) => {
    signup(emailValue, passwordValue)
    evt.preventDefault()
  }

  return (
    <div className="signupForm">
      <h3>Signup</h3>
      <form
        className="signupForm__formContainer"
        onSubmit={handleSubmit}
      >
        <input
          className="signupForm__email"
          placeholder="Email"
          {...emailBindInput}
          required
        />
        <input
          type="password"
          className="signupForm__password"
          placeholder="Password"
          required
        />
        <input
          type="password"
          className="signupForm__password"
          placeholder="Confirm Password"
          {...passwordBindInput}
          required
        />
        <div className="signupForm__buttons">
          <button className="signupForm__submit">Sign up</button>
        </div>
      </form>
    </div>
  )
}

SignupForm.propTypes = {}

export default SignupForm
