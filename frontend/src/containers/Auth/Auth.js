import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoginForm from '../../components/LoginForm'
import SignupForm from '../../components/SignupForm'
import { signup, signupError } from '../../actions/signup'

const mapToProps = (state) => ({
  error: state.signup.error,
})

export const Auth = ({ signup, error }) => (
  <>
    <LoginForm />
    <SignupForm signup={signup} signupError={signupError} error={error} />
  </>
)

Auth.propTypes = {}

export default connect(mapToProps, { signup, signupError })(Auth)
