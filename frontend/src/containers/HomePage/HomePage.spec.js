import React from 'react'
import HomePage from './HomePage'
import { render } from '@testing-library/react'

describe('HomePage', () => {
  describe('@renders', () => {
    it('renders the Dashboard without any error', () => {
      const { asFragment } = render(<HomePage />)

      expect(asFragment()).toMatchSnapshot()
    })
  })
})
