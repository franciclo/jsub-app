import React from 'react'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import Auth0 from '../containers/auth0'
import reducers from '../actions'
import thunk from 'redux-thunk'

const store = createStore( reducers, applyMiddleware(thunk) )

export default ({children}) => (
  <Provider store={store}>
    <div>
      <Head>
        <title>Juntos somos un bosque</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link href='/static/styles.css' rel='stylesheet' />
      </Head>
      <Auth0 />
    </div>
  </Provider>
)
