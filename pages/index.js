import React, {Component} from 'react'
import Head from 'next/head'
import { Provider } from 'react-redux'
import reducer, {initStore} from '../actions'
import { getUserFromCookie, getUserFromLocalStorage, login } from '../actions/auth'
import Avatar from '../containers/avatar'


export default class Home extends Component {
  static getInitialProps ({ req }) {
    const isServer = !!req
    const store = initStore(reducer, {}, isServer)
    const user = getUserFromCookie(req)
    if (user) store.dispatch(login(user))
    return { initialState: store.getState(), isServer }
  }

  constructor (props) {
    super(props)
    this.store = initStore(reducer, props.initialState, props.isServer)
  }

  componentDidMount () {
    if (!this.props.initialState.auth.isAuthenticated) {
      const user = getUserFromLocalStorage()
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
        </div>
      </Provider>
    )
  }
}
