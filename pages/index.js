import React, {Component} from 'react'
import initStore from '../store/init-store.js'
import {login, logout} from '../actions/user'
import {
  getProfile,
  getJwtFromCookie,
  decodeToken,
  authenticate
} from '../utils/auth'
import {loadMasArboles} from '../actions/arboles'
import Home from '../layouts/home'
import User from '../containers/user'
import Arboles from '../containers/arboles'
import Mapa from '../containers/mapa'

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
