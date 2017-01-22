import React, {Component} from 'react'
import { connect } from 'react-redux'
import {show} from '../utils/lock'
import {logout} from '../actions/user'
import fetch from 'isomorphic-fetch'

const avatar = ({ user, onLogout }) => (
  <div>
    {
      (user && user.isAuthenticated)
      ? (
        <div>
          <p>hola {user.profile.nickname}</p>
          <button onClick={onLogout}>Cerrar sesion</button>
        </div>
      )
      : (
        <button onClick={show}>Ingresar</button>
      )
    }
  </div>
)

const Avatar = connect(
  state => state,
  dispatch => ({
    onLogout: () => dispatch(logout())
  })
)(avatar)

export default Avatar
