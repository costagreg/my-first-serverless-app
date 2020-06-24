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

    describe('textarea is empty', () => {
      it('should not copy to clipboard', () => {
        const { getByRole, queryByText } = render(
          <UrlShortenerOutput urlShortened="" />
        )
  
        const textLink = getByRole('textbox')
        
        fireEvent.click(textLink)
  
        expect(queryByText('Copied to clipboard!')).toBeNull()
  
        expect(global.document.execCommand).toHaveBeenCalledTimes(0)

      })
    })
  })
})
