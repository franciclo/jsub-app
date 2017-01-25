import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetch from 'isomorphic-fetch'
import { show as showLock } from '../utils/lock'
import { logout } from '../actions/user'
import { toggleBox } from '../actions/boxes'
import UserPic from '../components/user-pic'
import UserBox from '../components/user-box'

const User = ({
    user,
    onLogout,
    boxVisible,
    onToggleBox
  }) => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      right: 0,
      margin: '15px 30px 0 0'
    }}>
    {
      (user && user.isAuthenticated)
      ? (
        <div>
          <UserPic
            picture={user.profile.picture}
            onToggleBox={onToggleBox}
            boxVisible={boxVisible} />
          {
            boxVisible &&
              <UserBox
                onLogout={onLogout}
                onToggleBox={onToggleBox}
                picture={user.profile.picture}
                nickname={user.profile.nickname} />
          }
        </div>
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
)

export default connect(
  state => ({
    user: state.user,
    boxVisible: state.boxes.visible === 'user'
  }),
  dispatch => ({
    onLogout: () => dispatch(logout()),
    onToggleBox: () => dispatch(toggleBox('user'))
  })
)(User)
