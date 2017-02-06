import fetch from 'isomorphic-fetch'
import config from '../config.json'
import { fetchEspecies } from '../actions/especies'

export const SET_VISIBLE_VIVEROS = 'SET_VISIBLE_VIVEROS'
export const ADD_VIVEROS = 'ADD_VIVEROS'

export function setVisibleViveros(ids) {
  return (dispatch, getState) => {
    const { viveros, especies } = getState()
    const savedEspeciesIds = new Set(Object.keys(especies))
    const savedViverosIds = new Set(viveros.all.map(v => v.properties.id))
    const newIds = ids.filter(id => !savedViverosIds.has(id))

    if (newIds.length !== 0) {
      fetch(`${config.API_ROOT}/viveros/stock/${newIds.join(',')}`)
        .then(res => res.ok && res.json())
        .then(result => {
          const resultEspecies = result
            .map(viv => {
              return viv.properties.stock.map(st => st.especie)
            })
            .reduce((acc, esp) => acc.concat(esp), [])
            .filter(esp => esp)
          const newEspecies = [...new Set(resultEspecies)].filter(esp => !savedEspeciesIds.has(esp))
          if (newEspecies.length !== 0) dispatch(fetchEspecies(newEspecies))

          dispatch({
            type: ADD_VIVEROS,
            viveros: result
          })

          dispatch({
            type: SET_VISIBLE_VIVEROS,
            ids
          })
        })
        .catch(err => { console.error('fetch stock error ', err) })
    } else {
      dispatch({
        type: SET_VISIBLE_VIVEROS,
        ids
      })
    }
  }
}

export default function reducer(state = {
  visible: [],
  all: []
}, action) {
  switch (action.type) {
    case SET_VISIBLE_VIVEROS:
      return Object.assign({}, state, {
        visible: action.ids
      })
    case ADD_VIVEROS:
      return Object.assign({}, state, {
        all: state.all.concat(action.viveros)
      })
    default:
      return state
  }
}
