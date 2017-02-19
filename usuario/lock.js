import uuid from 'uuid'
import config from '../config.json'
import { setSecret } from './auth'

const getLock = (options) => {
  return new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_CLIENT_DOMAIN, options)
}

const getBaseUrl = () => `${window.location.protocol}//${window.location.host}`

const getOptions = () => {
  const secret = uuid.v4()
  setSecret(secret)
  return {
    auth: {
      responseType: 'token',
      redirectUrl: `${getBaseUrl()}`,
      params: {state: secret}
    },
    allowedConnections: ["Username-Password-Authentication","facebook"],
    socialButtonStyle: "small",
    theme: {
      "logo":"http://www.juntossomosunbosque.red/aguarinodos.svg",
      "primaryColor":"#2bd873"
    },
    languageDictionary: {"title":"Juntos somos un bosque"},
    language: "es"
  }
}

export const show = () => getLock(getOptions()).show()

export const logout = () => getLock().logout()
