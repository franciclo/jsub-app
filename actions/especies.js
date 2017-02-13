import fetch from 'isomorphic-fetch'
import config from '../config.json'

export const ADD_ESPECIES = 'ADD_ESPECIES'

export function setVisibleEspecies(newIds) {
  return async function(dispatch, getState) {
    const { especies } = getState()
    console.log('hay nuevas especies', Object.keys(especies.all), newIds)
    const result = await fetch(`${config.API_ROOT}/especies/${newIds.join(',')}`)
      .then(res => res.ok && res.json())

      dispatch({
        type: ADD_ESPECIES,
        especies: result.reduce((acc, esp) => {
          acc[esp.especieId] = esp
          return acc
        },{})
      })
  }
}

export const ACTIVE_ESPECIE = 'ACTIVE_ESPECIE'

export function setActiveEspecie (especie) {
  return {
    type: ACTIVE_ESPECIE,
    especie
  }
}

export default function reducer(state = {
  all: {},
  active: 'ALL'
}, action) {
  switch (action.type) {
    case ADD_ESPECIES:
      return Object.assign({}, state, {
        all: {...state.all, ...action.especies}
      })
    case ACTIVE_ESPECIE:
      return Object.assign({}, state, {
        active: action.especie
      })
    default:
      return state
  }
}
