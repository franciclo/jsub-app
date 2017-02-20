import { combineReducers } from 'redux'
import productores from './productores'
import productos from './productos'
import visible from './visible'

const reducer = combineReducers({ productores, productos, visible })

export default reducer
