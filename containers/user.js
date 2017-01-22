import React, {Component} from 'react'
import { connect } from 'react-redux'
import fetch from 'isomorphic-fetch'
import {show as showLock} from '../utils/lock'
import {logout} from '../actions/user'
import UserPic from '../components/user-pic'

export default connect(
  state => state,
  dispatch => ({
    onLogout: () => dispatch(logout())
  })
)(({ user, onLogout }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    right: 0,
    margin: '15px 30px 0 0'
  }}>
    {
      (user && user.isAuthenticated)
      ? (
        <UserPic src={user.profile.picture} />
      )
      : (
        <button
          style={{
            background: 'rgb(0, 154, 255)',
            color: 'rgb(255, 255, 255)',
            border: 'none',
            borderRadius: '3px',
            padding: '7px 11px',
            fontWeight: 'bold',
            fontSize: '13px',
            cursor: 'pointer',
            outline: 'none'
          }}
          onClick={showLock}>
          Iniciar sesion
        </button>
      )
    }
  </div>
))
