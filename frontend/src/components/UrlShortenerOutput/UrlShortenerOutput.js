import React from 'react'

import './UrlShortenerOutput.scss'

export default ({ urlShortened, error }) => {
  return (
    <div className="urlShortenerOutput">{error ? error : urlShortened}</div>
  )
}
