import React from 'react'
import HomePage from './HomePage'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import mockAxios from 'axios'

jest.mock('axios')

const props = {
  appConfig: { apiUrl: 'http://api.test.com' },
}

describe('HomePage', () => {
  describe('@renders', () => {
    it('renders the Dashboard without any error', () => {
      const { asFragment } = render(<HomePage {...props} />)

      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('@submit', () => {
    mockAxios.post.mockImplementation(() =>
      Promise.resolve({
        data: {
          result: { id: 'xysuk' },
        },
      })
    )

    it('should call the API to add the url', async () => {
      const { getByRole, getByText } = render(<HomePage {...props} />)

      const urlInput = getByRole('textbox')
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
  })
})
