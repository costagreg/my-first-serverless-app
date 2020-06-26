import React from 'react'
import HomePage from './HomePage'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { URL_INPUT_PLACEHOLDER} from '../../components/UrlInputForm/UrlInputForm'
import mockAxios from 'axios'

jest.mock('axios')

const props = {
  appConfig: { apiUrl: 'http://api.test.com' },
}

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('@renders', () => {
    it('renders the <HomePage/> without any error', () => {
      const { asFragment } = render(<HomePage {...props} />)

      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('@submit', () => {
    beforeEach(() => {
      mockAxios.post.mockImplementation(() =>
        Promise.resolve({
          data: {
            result: { id: 'xysuk' },
          },
        })
      )
    })

    describe('It is a valid URL', () => {
      it('should call the API to add the url', async () => {
        const { getByPlaceholderText, getByText, getByRole } = render(<HomePage {...props} />)
        const urlInput = getByPlaceholderText(URL_INPUT_PLACEHOLDER)
        const submitButton = getByRole('button')

        fireEvent.change(urlInput, {
          target: { value: 'http://www.example.com/' },
        })

        fireEvent.click(submitButton)

        expect(mockAxios.post).toHaveBeenCalledWith(
          'http://api.test.com/api/url',
          {
            url: 'http://www.example.com/',
          }
        )

        await waitFor(() => getByText('http://api.test.com/xysuk'))
      })

      describe('Does not contain a protocol', () => {
        it('adds https', async () => {
          const { getByPlaceholderText, getByRole, getByText } = render(<HomePage {...props} />)

          const urlInput = getByPlaceholderText(URL_INPUT_PLACEHOLDER)
          const submitButton = getByRole('button')

          fireEvent.change(urlInput, {
            target: { value: 'www.example.com/' },
          })

          fireEvent.click(submitButton)

          expect(mockAxios.post).toHaveBeenCalledWith(
            'http://api.test.com/api/url',
            {
              url: 'https://www.example.com/',
            }
          )

          await waitFor(() => getByText('http://api.test.com/xysuk'))
        })
      })
    })

    describe('It is not a valid URL', () => {
      it('should not call the API and should show an alert', async () => {
        const { getByPlaceholderText, getByRole, getByText } = render(<HomePage {...props} />)

        const urlInput = getByPlaceholderText(URL_INPUT_PLACEHOLDER)
        const submitButton = getByRole('button')

        fireEvent.change(urlInput, {
          target: { value: 'example' },
        })

        fireEvent.click(submitButton)

        expect(mockAxios.post).toHaveBeenCalledTimes(0)

        await waitFor(() => getByText('Url not valid'))
      })
    })

    describe('Something went wrong on the call', () => {
      beforeEach(() => {
        mockAxios.post.mockImplementation(() =>
          Promise.reject({
            error: 'Something really wrong :)',
          })
        )
      })

      it('should show an error', async () => {
        const { getByPlaceholderText, getByRole, getByText } = render(<HomePage {...props} />)

        const urlInput = getByPlaceholderText(URL_INPUT_PLACEHOLDER)
        const submitButton = getByRole('button')

        fireEvent.change(urlInput, {
          target: { value: 'example.com' },
        })

        fireEvent.click(submitButton)

        await waitFor(() => getByText('Ops something went wrong'))
      })
    })
  })
})
