import React from 'react'
import PropTypes from 'prop-types'

import './AccessButtons.scss'

const AccessButtons = (props) => {
  return (
    <div className="accessButtons">
      <button className="accessButtons__signIn">Sign In</button>
      <button className="accessButtons__signUp">Sign Up</button>
    </div>
  )
}

AccessButtons.propTypes = {}

export default AccessButtons
