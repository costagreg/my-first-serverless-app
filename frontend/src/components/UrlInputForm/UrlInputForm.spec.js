import React from 'react'
import UrlInputForm from './UrlInputForm'
import { render, fireEvent } from '@testing-library/react'

describe('UrlInputForm', () => {
  describe('@renders', () => {
    it('renders UrlInputForm without any error', () => {
      const { asFragment } = render(<UrlInputForm />)

      expect(asFragment()).toMatchSnapshot()
    })

    describe('error is passed as prop', () => {
      it('adds a classname to input', () => {
        const { getByRole } = render(<UrlInputForm error='Url not valid' />)

        const urlInput = getByRole('textbox')

        expect(urlInput).toHaveClass('urlInputForm__input--error')
      })
    })
  })

  describe('@submit', () => {
    it('should call createUrl prop', () => {
      const createUrl = jest.fn(() => {})
      const { getByRole } = render(
        <UrlInputForm createUrl={createUrl} />
      )

      const urlInput = getByRole('textbox')
      const submitButton = getByRole('button')

      fireEvent.change(urlInput, {
        target: { value: 'jshaksj' },
      })

      fireEvent.click(submitButton)

      expect(createUrl).toHaveBeenCalledTimes(1)
    })
  })
})
