import React from 'react'
import UrlShortenerOutput from './UrlShortenerOutput'
import { render, fireEvent, waitFor } from '@testing-library/react'

describe('UrlShortenerOutput', () => {
  describe('@renders', () => {
    it('renders UrlShortenerOutput without any error', () => {
      const { asFragment } = render(<UrlShortenerOutput />)

      expect(asFragment()).toMatchSnapshot()
    })

    describe('error prop is passed', async () => {
      const { getByText } = render(
        <UrlShortenerOutput error="ops" urlShortened="http://www.example.com" />
      )

      const errorMessage = getByText('ops')

      expect(errorMessage).toHaveClass('urlShortenerOutput--error')
    })
  })

  describe('User click in the link', () => {
    beforeEach(() => {
      global.document.execCommand = jest.fn(() => {})
    })

    it('should copy to clipboard', async () => {
      const { getByText } = render(
        <UrlShortenerOutput urlShortened="http://www.example.com" />
      )

      const textLink = getByText('http://www.example.com')
      
      fireEvent.click(textLink)

      await waitFor(() => getByText('Copied to clipboard!'))

      expect(global.document.execCommand).toHaveBeenCalledTimes(1)
      expect(global.document.execCommand).toHaveBeenCalledWith('copy')
    })
  })
})
