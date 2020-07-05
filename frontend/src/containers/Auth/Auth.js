import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoginForm from '../../components/LoginForm'
import SignupForm from '../../components/SignupForm'
import { signup } from '../../actions/signup'

const mapToProps = (state) => ({})

export const Auth = ({signup}) => (
  <>
    <LoginForm />
    <SignupForm signup={signup}/>
  </>
)

Auth.propTypes = {}

export default connect(mapToProps, {signup})(Auth)
