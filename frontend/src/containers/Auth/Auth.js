import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoginForm from '../../components/LoginForm'
import SignupForm from '../../components/SignupForm'
import AuthButtons from '../../components/AuthButtons'
import { signup, signupError } from '../../actions/signup'
import { login, getCurrentUser } from '../../actions/login'

const mapToProps = (state) => ({
  user: state.login.user,
  error: state.signup.error,
})

const AuthSignupLogin = ({isLogin, setIsLogin}) => <>
  <AuthButtons isLogin={isLogin} setIsLogin={setIsLogin} />
  {isLogin ? (
    <LoginForm login={login} />
  ) : (
    <SignupForm
      signup={signup}
      signupError={signupError}
      error={error}
    />
  )}
</>

export const Auth = ({
  user,
  login,
  signup,
  signupError,
  getCurrentUser,
  error,
}) => {
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <>
      {user ? (
        <>
          Welcome back ${user}
        </>
      ) : (
       <AuthSignupLogin isLogin={isLogin} setIsLogin={setIsLogin} />
      )}
    </>
  )
}

Auth.propTypes = {
  signup: PropTypes.func,
  signupError: PropTypes.func,
  error: PropTypes.string,
  user: PropTypes.string,
}

export default connect(mapToProps, {
  signup,
  signupError,
  login,
  getCurrentUser,
})(Auth)
