import React from 'react'
import UrlInputForm from './UrlInputForm'
import { render } from '@testing-library/react'

describe('UrlInputForm', () => {
  describe('@renders', () => {
    it('renders UrlInputFormwithout any error', () => {
      const { asFragment } = render(<UrlInputForm />)

      expect(asFragment()).toMatchSnapshot()
    })
  })
})
