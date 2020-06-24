import React, { useRef, useState } from 'react'
import classNames from 'classnames'

import './UrlShortenerOutput.scss'

const UrlShortenerOutputLink = ({ urlShortened }) => {
  const urlShortenedRef = useRef()
  const [hasCopySuccessed, setHasCopySuccessed] = useState(false)

  const copyToClipboard = (e) => {
    if (urlShortened) {
      urlShortenedRef.current.select()
      document.execCommand('copy')
      urlShortenedRef.current.focus()
      setHasCopySuccessed(true)
    }
  }

  return (
    <>
      <textarea
        className={classNames('urlShortenerOutput__link')}
        ref={urlShortenedRef}
        onClick={copyToClipboard}
        value={urlShortened}
        readOnly
      />
      {hasCopySuccessed && (
        <span className="urlShortenerOutput__copiedMessage">
          Copied to clipboard!
        </span>
      )}
    </>
  )
}

export default ({ urlShortened, error }) => (
  <div
    className={classNames('urlShortenerOutput', {
      'urlShortenerOutput--error': error,
    })}
  >
    {error ? error : <UrlShortenerOutputLink urlShortened={urlShortened} />}
  </div>
)
