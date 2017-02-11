import { combineReducers } from 'redux'
import user from './user'
// import arboles from './arboles'
import boxes from './boxes'
import viveros from './viveros'
import especies from './especies'

export default combineReducers({
  user,
  // arboles,
  boxes,
  viveros,
  especies
})
