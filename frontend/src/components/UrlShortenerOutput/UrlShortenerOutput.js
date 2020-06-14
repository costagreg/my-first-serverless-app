import React from 'react'

import './UrlShortenerOutput.scss'

export default ({urlShortened}) => {

  return (
    <div className='urlShortenerOutput'>
      {urlShortened}
    </div>
  )
}
