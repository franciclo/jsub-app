import user from './user.js'
import arboles from './arboles.js'
import boxes from './boxes.js'
import { combineReducers } from 'redux'

export default combineReducers({
  user,
  arboles,
  boxes
})
