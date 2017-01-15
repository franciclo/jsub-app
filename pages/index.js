import React, {Component} from 'react'
import Head from 'next/head'
import { Provider } from 'react-redux'
import initStore from '../store/init-store.js'
import reducer from '../actions'
import {
  getToken,
  login
} from '../actions/auth'
import {loadMasArboles} from '../actions/arboles'
import Avatar from '../containers/avatar'
import Arboles from '../containers/arboles'

export default class Home extends Component {
  static getInitialProps ({ req }) {
    const isServer = !!req
    const store = initStore(reducer, {}, isServer)
    const user = getToken(false, req)
    if (user) {
      store.dispatch(login(user))
      store.dispatch(loadMasArboles(getToken(true, req)))
    }
    console.log(store.getState())
    return { initialState: store.getState(), isServer }
  }

  constructor (props) {
    super(props)
    this.store = initStore(reducer, props.initialState, props.isServer)
  }

  componentDidMount () {
    if (!this.props.initialState.auth.isAuthenticated) {
      const user = getToken(false, false)
      if (user) this.store.dispatch(login(user))
    }
  }

  render () {
    return (
      <Provider store={this.store}>
        <div>
          <Head>
            <title>Juntos somos un bosque</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link href='/static/styles.css' rel='stylesheet' />
          </Head>
          <Avatar {...this.props} />
          <Arboles {...this.props} />
        </div>
      </Provider>
    )
  }
}
