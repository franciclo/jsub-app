import React, {Component} from 'react'
import initStore from '../store/init-store.js'
import {login} from '../actions/auth'
import {loadMasArboles} from '../actions/arboles'
import Home from '../layouts/home'

export default class HomeIndex extends Component {
  static getInitialProps ({ req, query, res }) {
    const store = initStore({})

    if(query.code) {
      console.log(query)
      console.log(req.headers.cookie)
      res.setHeader('Location', 'http://localhost:3000')
      res.setHeader('Set-Cookie', 'jwt=asasdasd; path=/; HttpOnly')
      res.statusCode = 301
    }
    return { initialState: store.getState()}
  }

  constructor (props) {
    super(props)
    this.store = initStore(props.initialState)
    console.log('----------------------------')
    console.log(this.store)
  }

  render () {
    return <Home {...this.props} />
  }
}
