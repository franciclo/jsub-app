import React, {Component} from 'react'
import Head from 'next/head'
import {authenticate} from '../actions/auth'

export default class Hola extends Component {
  componentDidMount () {
    authenticate()
    this.props.url.pushTo('/')
  }
  render () {
    return (
      <div>
        <Head>
          <title>Juntos somos un bosque</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link href='/static/styles.css' rel='stylesheet' />
        </Head>
        <div>
          hola
        </div>
      </div>
    )
  }
}
