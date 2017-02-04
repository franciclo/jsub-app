import user from './user'
import arboles from './arboles'
import boxes from './boxes'
import viveros from './viveros'
import { combineReducers } from 'redux'

export default combineReducers({
  user,
  arboles,
  boxes,
  viveros
})
