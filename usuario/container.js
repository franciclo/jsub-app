import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetch from 'isomorphic-fetch'
import { show as showLock } from './lock'
import { logout } from './module'
import UserPic from './components/user-pic'
import UserBox from './components/user-box'

class user exrends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeProfile: false
    }
  }

  onToggleBox () {
    this.setState({ activeProfile: true })
  }

  render () {
    const {
        user,
        onLogout
      } = this.props
    return (
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
                this.state.activeProfile &&
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
  }
}

export default connect(
  state => ({
    user: state.user
  }),
  dispatch => ({
    onLogout: () => dispatch(logout())
  })
)(User)
