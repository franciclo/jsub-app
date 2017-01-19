import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import apiMiddleware from './api-middleware'
import reducer from '../actions'

export default function initStore (initialState) {
  if (typeof window === 'undefined') {
    return createStore(reducer, initialState, applyMiddleware(thunkMiddleware, apiMiddleware))
  } else {
    if (!window.store) {
      window.store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware, apiMiddleware, loggerMiddleware()))
    }
    return window.store
  }
}
