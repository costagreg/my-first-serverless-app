import React from 'react'
import AccessButtons from './UrlInputForm'
import { render } from '@testing-library/react'

describe('AccessButtons', () => {
  describe('@renders', () => {
    it('renders <AccessButtons /> without any error', () => {
      const { asFragment } = render(<AccessButtons />)

      expect(asFragment()).toMatchSnapshot()
    })
  })
})
