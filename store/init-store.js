import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import usuario from '../modules/usuario/module'
import mapa from '../modules/mapa/module'

const reducer = combineReducers({
  usuario,
  mapa
})

export default function initStore (initialState) {
  if (typeof window === 'undefined') {
    return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
  } else {
    if (!window.store) {
      window.store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware, loggerMiddleware()))
    }
    return window.store
  }
}
