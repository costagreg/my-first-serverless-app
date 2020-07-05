import React from 'react'
import AuthButtons from './AuthButtons'
import { render } from '@testing-library/react'

describe('AuthButtons', () => {
  describe('@renders', () => {
    it('renders <AuthButtons /> without any error', () => {
      const { asFragment } = render(<AuthButtons />)

      expect(asFragment()).toMatchSnapshot()
    })
  })
})
