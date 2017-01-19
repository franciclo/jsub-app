import React, {Component} from 'react'
import { connect } from 'react-redux'
import {show} from '../utils/lock'
import {getToken, logout} from '../actions/auth'
import fetch from 'isomorphic-fetch'

class avatar extends Component {
  render() {
    return (
      <div>
        {
          !this.props.auth.isAuthenticated &&
          (
            <button onClick={show}>Ingresar</button>
          )
        }

        {
          this.props.auth.isAuthenticated &&
          (
            <div>
              <p>hola {this.props.auth.user.nickname}</p>
              <button onClick={logout}>Cerrar sesion</button>
            </div>
          )
        }
      </div>
    )
  }
}
const Avatar = connect(state => state)(avatar)

export default Avatar
