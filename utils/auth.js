import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'
import fetch from 'isomorphic-fetch'
import config from '../config.json'

// get auth0 callback data from hash
const getQueryParams = () => {
  const params = {}
  window.location.href.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    params[$1] = $3
  })
  return params
}
const extractInfoFromHash = () => {
  const {id_token, state} = getQueryParams()
  return {token: id_token, secret: state}
}

// validate own random id
export const setSecret = (secret) => window.localStorage.setItem('secret', secret)
const checkSecret = (secret) => window.localStorage.secret === secret

// handle jwt token
export const setToken = (token) => {
  window.localStorage.setItem('token', token)
  Cookie.set('jwt', token)
}
export const unsetToken = () => {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('secret')
  Cookie.remove('jwt')

  window.localStorage.setItem('logout', Date.now())
}

// get token
function getJwtFromLocalStorage() {
  const jwtLocal = window.localStorage.token
  if(!jwtLocal) return undefined
  return jwtLocal
}
export function getJwtFromCookie(cookie) {
  const jwtCookie = cookie.split(';').find(c => c.trim().startsWith('jwt='))
  if (!jwtCookie) return undefined
  return jwtCookie.split('=')[1]
}

// validate token's expiration
function checkExpiry(jwtExp) {
  let expiryDate = new Date(0);
  expiryDate.setUTCSeconds(jwtExp);

  return new Date() < expiryDate
}

// use token
export function decodeToken(token) {
  if (!token) return false
  let jwt
  try {
    jwt = jwtDecode(token)
  } catch (err) {
    console.error('token decode fail', err)
    jwt = false
  }
  if(!jwt || !checkExpiry(jwt.exp)) return false
  return jwt
}

// set user data
export function authenticate() {
  const {token, secret} = extractInfoFromHash()
  history.pushState(null, null, '/')
  if (!checkSecret(secret) || !token) return
  setToken(token)
  return token
}

// get auth0 user profile
export function getProfile(id, token) {
  return fetch(`https://${config.AUTH0_CLIENT_DOMAIN}/api/v2/users/${id}?fields=email,nickname,picture`,{
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .catch(err => {
      console.error('get profile error', `${config.AUTH0_CLIENT_DOMAIN}/api/v2/users/${id}?fields=email,nickname,picture`, err)
      return Promise.resolve(false)
    })
}
