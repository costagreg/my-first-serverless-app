import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoginForm from '../../components/LoginForm'
import SignupForm from '../../components/SignupForm'
import AuthButtons from '../../components/AuthButtons'
import { signup, signupError } from '../../actions/signup'
import { login } from '../../actions/login'

const mapToProps = (state) => ({
  user: state.signup.user,
  error: state.signup.error,
})

export const Auth = ({ login, signup, signupError, error }) => {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <>
      <AuthButtons setShowLogin={setShowLogin} />
      {showLogin ? (
        <LoginForm login={login} />
      ) : (
        <SignupForm signup={signup} signupError={signupError} error={error} />
      )}
    </>
  )
}

Auth.propTypes = {
  signup: PropTypes.func,
  signupError: PropTypes.func,
  error: PropTypes.string,
}

export default connect(mapToProps, { signup, signupError, login })(Auth)
