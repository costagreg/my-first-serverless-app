import React from 'react'
import UrlInputForm, {
  URL_INPUT_PLACEHOLDER,
  SUBMIT_PLACEHOLDER,
} from './UrlInputForm'
import { render, fireEvent } from '@testing-library/react'

describe('UrlInputForm', () => {
  describe('@renders', () => {
    it('renders UrlInputForm without any error', () => {
      const { asFragment } = render(<UrlInputForm />)

      expect(asFragment()).toMatchSnapshot()
    })

    describe('error is passed as prop', () => {
      it('adds a classname to input', () => {
        const { getByPlaceholderText } = render(
          <UrlInputForm error="Url not valid" />
        )

        const urlInput = getByPlaceholderText(URL_INPUT_PLACEHOLDER)

        expect(urlInput).toHaveClass('urlInputForm__input--error')
      })
    })
  })

  describe('@submit', () => {
    it('should call createUrl prop', () => {
      const createUrl = jest.fn(() => {})
      const { getByPlaceholderText, getByRole } = render(
        <UrlInputForm createUrl={createUrl} />
      )

      const urlInput = getByPlaceholderText(URL_INPUT_PLACEHOLDER)
      const submitButton = getByRole('button', { name: SUBMIT_PLACEHOLDER })

      fireEvent.change(urlInput, {
        target: { value: 'jshaksj' },
      })

      fireEvent.click(submitButton)

      expect(createUrl).toHaveBeenCalledTimes(1)
    })
  })
})
