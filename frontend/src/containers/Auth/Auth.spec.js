import React from 'react'
import Auth from './Auth'
import { render, fireEvent, waitFor } from '../../helpers/testUtils'

describe('Auth', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('@renders', () => {
    it('renders the <Auth/> without any error', () => {
      const { asFragment } = render(<Auth />)

      expect(asFragment()).toMatchSnapshot()
    })
  })
})
