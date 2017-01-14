import React, {Component} from 'react'
import { connect } from 'react-redux'
import {show} from '../utils/lock'
import {logout} from '../actions/auth'

class avatar extends Component {
  componentDidMount () {
    console.log('this.props.auth', this.props.auth)
  }

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
              <span>hola {this.props.auth.user.email}</span>
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
