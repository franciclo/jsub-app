import React, {Component} from 'react'
import Head from 'next/head'
import {authenticate} from '../actions/auth'

export default class Hola extends Component {
  componentDidMount () {
    authenticate()
  }
  render () {
    return <div>hola..........</div>
  }
}
