import React from 'react'
import './UrlInputForm.scss'

export default () => (
  <form className="urlInputForm">
    <input className="urlInputForm__input" type="text" />
    <input className="urlInputForm__submit" value="Cut me!" type="submit" />
  </form>
)
