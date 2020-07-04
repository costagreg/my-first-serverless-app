import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoginForm from '../../components/LoginForm'
import SignupForm from '../../components/SignupForm'

const mapToProps = (state) => ({})

export const Auth = (props) => (
  <>
    <LoginForm />
    <SignupForm />
  </>
)

Auth.propTypes = {}

export default connect(mapToProps, {})(Auth)
