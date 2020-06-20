import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import useInput from '../../hooks/useInput'

import './UrlInputForm.scss'

const UrlInputForm = (props) => {
  const { value, bindInput } = useInput('')
  const { createUrl, error } = props

  const handleSubmit = (evt) => {
    createUrl(value)
    evt.preventDefault()
  }

  return (
    <form className="urlInputForm" onSubmit={handleSubmit}>
      <input
        className={classNames('urlInputForm__input', {
          'urlInputForm__input--error': error,
        })}
        type="text"
        placeholder="https://www.example.com"
        {...bindInput}
      />
      <input className="urlInputForm__submit" value="Cut me!" type="submit" />
    </form>
  )
}

UrlInputForm.propTypes = {
  createUrl: PropTypes.func.isRequired,
  error: PropTypes.string,
}

export default UrlInputForm
