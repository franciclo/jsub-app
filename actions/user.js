import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'
import {logout as logoutLock} from '../utils/lock'
import {unsetToken} from '../utils/auth'

const LOGIN = 'LOGIN'
export function login (profile) {
  return {
    type: LOGIN,
    profile
  }
}

const LOGOUT = 'LOGOUT'
export function logout () {
  unsetToken()
  // logoutLock()
  console.log('logout')
  return {
    type: LOGOUT
  }
}

export default function reducer (state = {
    isAuthenticated: false,
    profile: {}
  }, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        isAuthenticated: true,
        profile: action.profile
      })
    case LOGOUT:
      return Object.assign({}, state, {
        isAuthenticated: false,
        profile: null
      })
    default:
      return state
    }
}
