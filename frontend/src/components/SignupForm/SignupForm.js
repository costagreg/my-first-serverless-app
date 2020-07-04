import React from 'react'
import PropTypes from 'prop-types'

import './SignupForm.scss'

const SignupForm = (props) => (
  <div className="signupForm">
    <h3>Signup</h3>
    <form className="signupForm__formContainer">
      <input className="signupForm__email" placeholder="Email" />
      <input type="password" className="signupForm__password" placeholder="Password" />
      <input type="password" className="signupForm__password" placeholder="Confirm Password" />
      <div className="signupForm__buttons">
        <button className="signupForm__submit">Sign up</button>
      </div>
    </form>
  </div>
)

SignupForm.propTypes = {}

export default SignupForm
