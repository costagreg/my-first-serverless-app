import React from 'react'
import HomePageView from './HomePageView'
import { render } from '@testing-library/react'

describe('HomePageView', () => {
  describe('@renders', () => {
    it('renders <HomePageView /> without any error', () => {
      const { asFragment } = render(<HomePageView />)

      expect(asFragment()).toMatchSnapshot()
    })
  })
})
