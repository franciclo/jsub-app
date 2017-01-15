import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import apiMiddleware from './api-middleware'

export default function initStore (reducer, initialState, isServer) {
  if (isServer && typeof window === 'undefined') {
    return createStore(reducer, initialState, applyMiddleware(thunkMiddleware, apiMiddleware))
  } else {
    if (!window.store) {
      window.store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware, apiMiddleware, loggerMiddleware()))
    }
    return window.store
  }
}
