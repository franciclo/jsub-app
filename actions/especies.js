import fetch from 'isomorphic-fetch'
import config from '../config.json'

export const ADD_ESPECIES = 'ADD_ESPECIES'

export function fetchEspecies (especies) {
  return dispatch => {
    fetch(`${config.API_ROOT}/especies/${especies.join(',')}`)
    .then(res => res.ok && res.json())
    .then(result => {
      const especiesObj = {}
      result.forEach(esp => {
        especiesObj[esp.especieId] = esp.label
      })
      dispatch({
        type: ADD_ESPECIES,
        especies: especiesObj
      })
    })
    .catch(err => { console.error('fetch especies error ', err) })
  }
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case ADD_ESPECIES:
      return Object.assign({}, state, action.especies)
    default:
      return state
  }
}
