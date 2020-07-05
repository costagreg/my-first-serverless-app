import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoginForm from '../../components/LoginForm'
import SignupForm from '../../components/SignupForm'
import AuthButtons from '../../components/AuthButtons'
import { signup, signupError } from '../../actions/signup'

const mapToProps = (state) => ({
  error: state.signup.error,
})

export const Auth = ({ signup, signupError, error }) => {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <>
      <AuthButtons setShowLogin={setShowLogin} />
      {showLogin ? (
        <LoginForm />
      ) : (
        <SignupForm signup={signup} signupError={signupError} error={error} />
      )}
    </>
  )
}

Auth.propTypes = {}

export default connect(mapToProps, { signup, signupError })(Auth)
