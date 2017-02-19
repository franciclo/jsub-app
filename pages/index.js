import React, { Component } from 'react'
import initStore from '../store/init-store.js'
import { login, logout } from '../usuario/module'
import {
  getProfile,
  getJwtFromCookie,
  decodeToken,
  authenticate
} from '../usuario/auth'
import Home from '../layouts/home'
import User from '../usuario/container'
import Arboles from '../lista/container'
import Mapa from '../mapa/container'

export default class HomeIndex extends Component {
  static async getInitialProps ({ req, res }) {
    const store = initStore({})

    let token = false
    let tokenStr
    if (req && req.headers.cookie) {
      tokenStr = getJwtFromCookie(req.headers.cookie)
      token = decodeToken(tokenStr)
    }
    if (!token) return { initialState: store.getState()}

    const profile = await getProfile(token.sub, tokenStr)
    if (profile) store.dispatch(login(profile))

    return { initialState: store.getState() }
  }

  constructor (props) {
    super(props)
    this.store = initStore(props.initialState)
  }

  componentDidMount (props) {
    if (~window.location.hash.indexOf('access_token')) {
      const tokenStr = authenticate()
      const token = decodeToken(tokenStr)

      getProfile(token.sub, tokenStr).then(profile => {
        if (profile) this.store.dispatch(login(profile))
      })
    }
  }

  render () {
    return (
      <Home store={this.store}>
        <div>
          <User />
          <Arboles />
          <Mapa />
        </div>
      </Home>
     )
  }
}
