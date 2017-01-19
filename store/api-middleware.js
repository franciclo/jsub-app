import fetch from 'isomorphic-fetch'
import config from '../config.json'

export const API_ROOT = config.API_ROOT

function callApi(endpoint, authenticatedRequest) {
  let config = {}

  if(authenticatedRequest) {
    token = localStorage.token
    if(token) {
      config = {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    } else {
      console.log("No token saved!")
      return Promise.resolve()
    }
  }

  return fetch(API_ROOT + endpoint, config)
    .then(response =>
      response.json()
      .then(resource => ({ resource, response }))
    ).then(({ resource, response }) => {
      if (!response.ok) {
        return Promise.reject(resource)
      }
      return resource
    })
}

export const CALL_API = 'CALL_API'

export default store => next => action => {

  const callAPI = action[CALL_API]

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, types, authenticatedRequest, token } = callAPI

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL. api middleware.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types. api middleware.')
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings. api middleware.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, authenticatedRequest, token).then(
    response => next(actionWith({
      response,
      authenticatedRequest,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Error!'
    }))
  )
}
