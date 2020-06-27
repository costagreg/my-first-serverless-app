import React from 'react'
import LoginForm from './LoginForm'
import { render } from '@testing-library/react'

describe('LoginForm', () => {
  describe('@renders', () => {
    it('renders <LoginForm /> without any error', () => {
      const { asFragment } = render(<LoginForm />)

      expect(asFragment()).toMatchSnapshot()
    })
  })
})
