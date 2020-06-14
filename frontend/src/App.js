import React from 'react'
import HomePage from './containers/HomePage'
import './global.scss'

export default function App({ appConfig }) {
  return <HomePage appConfig={appConfig}  />
}
