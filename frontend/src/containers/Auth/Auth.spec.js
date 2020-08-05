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

  describe('SignUp', () => {
    describe('password does not match', () => {
      it('redenders an error message', () => {
        const { getByRole, getByPlaceholderText, getByText } = render(<Auth />)

        const signupButton = getByRole('button', { name: 'Signup' })

        fireEvent.click(signupButton)

        const emailInput = getByPlaceholderText('Email')
        const passwordInput = getByPlaceholderText('Password')
        const confirmPasswordInput = getByPlaceholderText('Confirm Password')
        const submitButton = getByRole('button', { name: 'Sign up' })

        fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } })
        fireEvent.change(passwordInput, { target: { value: 'password123*' } })
        fireEvent.change(confirmPasswordInput, {
          target: { value: 'password3*' },
        })

        fireEvent.click(submitButton)

        getByText("Password doesn't match")
      })
    })

    describe('password does match', () => {
      it('calls cognito user api and show a message', () => {
        const { getByRole, getByPlaceholderText, getByText } = render(<Auth />)

        const signupButton = getByRole('button', { name: 'Signup' })

        fireEvent.click(signupButton)

        const emailInput = getByPlaceholderText('Email')
        const passwordInput = getByPlaceholderText('Password')
        const confirmPasswordInput = getByPlaceholderText('Confirm Password')
        const submitButton = getByRole('button', { name: 'Sign up' })

        fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } })
        fireEvent.change(passwordInput, { target: { value: 'password123*' } })
        fireEvent.change(confirmPasswordInput, {
          target: { value: 'password123*' },
        })

        fireEvent.click(submitButton)

        getByText('Welcome back cognitousername')
      })
    })
  })
})
