import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import useInput from '../../hooks/useInput'

import './UrlInputForm.scss'

export const URL_INPUT_PLACEHOLDER = 'https://www.example.com'
export const SUBMIT_PLACEHOLDER = 'Cut me!'

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
        placeholder={URL_INPUT_PLACEHOLDER}
        {...bindInput}
      />
      <button type="submit" className="urlInputForm__submit">
        {SUBMIT_PLACEHOLDER}
      </button>
    </form>
  )
}

UrlInputForm.propTypes = {
  createUrl: PropTypes.func.isRequired,
  error: PropTypes.string,
}

export default UrlInputForm
