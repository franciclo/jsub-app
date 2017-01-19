import React, {Component} from 'react'
import Head from 'next/head'
import { Provider } from 'react-redux'
import Avatar from '../containers/avatar'
import Arboles from '../containers/arboles'
import Mapa from '../containers/mapa'

export default (props) => {
  console.log(props)
  return (
    <Provider store={props.store}>
      <div>
        <Head>
          <title>Juntos somos un bosque</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
          <link href='/static/styles.css' rel='stylesheet' />
          <script src="https://cdn.auth0.com/js/lock/10.9.1/lock.min.js"></script>
          <script src='https://api.mapbox.com/mapbox-gl-js/v0.31.0/mapbox-gl.js'></script>
          <link href='https://api.mapbox.com/mapbox-gl-js/v0.31.0/mapbox-gl.css' rel='stylesheet' />
        </Head>
        <Avatar {...props} />
        <Arboles {...props} />
        <Mapa />
      </div>
    </Provider>
  )
}
