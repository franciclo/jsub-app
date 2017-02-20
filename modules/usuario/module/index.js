import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'
import createReducer from '../../../store/create-reducer'
import {logout as logoutLock} from '../lock'
import {unsetToken} from '../auth'

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
  return {
    type: LOGOUT
  }
}

const reducer = createReducer({
    isAuthenticated: false,
    profile: {}
  }, {
  LOGIN: (state, action) => ({ ...state, ...{
    isAuthenticated: true,
    profile: action.profile
  } }),
  LOGOUT: (state, action) => ({ ...state, ...{
    isAuthenticated: false,
    profile: null
  } })
})

export default reducer
