import React from 'react'
import UrlShortenerOutput from './UrlShortenerOutput'
import { render } from '@testing-library/react'

describe('UrlShortenerOutput', () => {
  describe('@renders', () => {
    it('renders UrlShortenerOutput without any error', () => {
      const { asFragment } = render(<UrlShortenerOutput />)

      expect(asFragment()).toMatchSnapshot()
    })
  })
})
