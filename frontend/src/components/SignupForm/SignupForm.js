import React from 'react'
import PropTypes from 'prop-types'
import useInput from '../../hooks/useInput'

import './SignupForm.scss'

const SignupForm = ({ signup, error }) => {
  const { emailValue, emailBindInput } = useInput('email')
  const { passwordValue, passwordBindInput } = useInput('password')
  const { confirmPasswordValue, confirmPasswordBindInput } = useInput(
    'password'
  )

  const handleSubmit = (evt) => {
    if (passwordValue === confirmPasswordValue) {
      signup(emailValue, passwordValue)
    } else {
      signupError("Password doesn't match")
    }
    evt.preventDefault()
  }

  return (
    <div className="signupForm">
        <form className="signupForm__formContainer" onSubmit={handleSubmit}>
          <input
            className="signupForm__email"
            placeholder="Email"
            type="email"
            {...emailBindInput}
            required
          />
          <input
            type="password"
            className="signupForm__password"
            placeholder="Password"
            {...passwordBindInput}
            required
          />
          <input
            type="password"
            className="signupForm__password"
            placeholder="Confirm Password"
            {...confirmPasswordBindInput}
            required
          />
          <div className="signupForm__buttons">
            <button className="signupForm__submit">Sign up</button>
          </div>
          {error}
        </form>
    </div>
  )
}

SignupForm.propTypes = {}

export default SignupForm
