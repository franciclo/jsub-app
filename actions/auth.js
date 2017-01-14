import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'
import {logout as logoutLock} from '../utils/lock'

const getQueryParams = () => {
  const params = {}
  window.location.href.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    params[$1] = $3
  })
  return params
}

const extractInfoFromHash = () => {
  if (!process.browser) {
    return undefined
  }
  const {id_token, state} = getQueryParams()
  return {token: id_token, secret: state}
}

const checkSecret = (secret) => window.localStorage.secret === secret

const setToken = (token) => {
  if (!process.browser) {
    return
  }
  window.localStorage.setItem('token', token)
  Cookie.set('jwt', token)
}

export const setSecret = (secret) => window.localStorage.setItem('secret', secret)

export function authenticate() {
  const {token, secret} = extractInfoFromHash()
  if (!checkSecret(secret) || !token) {
    console.error('Something happened with the Sign In request')
  }
  setToken(token)
}



function checkExpiry(jwtExp) {
  let expiryDate = new Date(0);
  expiryDate.setUTCSeconds(jwtExp);

  if(new Date() < expiryDate) {
    return true;
  }
}

const LOGIN = 'LOGIN'

export function login (jwt) {
  return {
    type: LOGIN,
    user: jwt
  }
}

export const getUserFromLocalStorage = () => {
  const jwtLocal = window.localStorage.token
  if(!jwtLocal) return undefined

  const jwt = jwtDecode(jwtLocal)
  if (!checkExpiry(jwt.exp)) return undefined

  return jwt
}

export const getUserFromCookie = (req) => {
  if (!req || !req.headers.cookie) return undefined

  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
  if (!jwtCookie) return undefined

  const jwt = jwtDecode(jwtCookie.split('=')[1])
  if (!checkExpiry(jwt.exp)) return undefined

  return jwt
}



const unsetToken = () => {
  if (!process.browser) {
    return
  }
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('secret')
  Cookie.remove('jwt')

  window.localStorage.setItem('logout', Date.now())
}

const LOGOUT = 'LOGOUT'

export function logout () {
  unsetToken()
  logoutLock()
  return {
    type: LOGOUT
  }
}



export default function reducer (state = {
    isAuthenticated: false,
    user: {}
  }, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        isAuthenticated: true,
        user: action.user
      })
    case LOGOUT:
      return Object.assign({}, state, {
        isAuthenticated: false,
        user: null
      })
    default:
      return state
    }
}
