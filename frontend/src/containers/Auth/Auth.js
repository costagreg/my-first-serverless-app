import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoginForm from '../../components/LoginForm'

const mapToProps = (state) => ({

})

export const Auth = (props) => (
  <LoginForm />
)

Auth.propTypes = {

}

export default connect(mapToProps, {  })(Auth)
