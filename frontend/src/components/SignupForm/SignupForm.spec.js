import React from 'react'
import SignupForm from './SignupForm'
import { render } from '@testing-library/react'

describe('SignupForm', () => {
  describe('@renders', () => {
    it('renders <SignupForm /> without any error', () => {
      const { asFragment } = render(<SignupForm />)

      expect(asFragment()).toMatchSnapshot()
    })
  })
})
