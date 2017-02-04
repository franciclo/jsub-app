import fetch from 'isomorphic-fetch'
import config from '../config.json'

export const SET_VISIBLE_VIVEROS = 'SET_VISIBLE_VIVEROS'
export const ADD_VIVEROS = 'ADD_VIVEROS'

export function setVisibleViveros(ids) {
  return (dispatch, getState) => {
    const { viveros } = getState()
    const savedIds = new Set(viveros.all.map(v => v.properties.id))
    const newIds = ids.filter(id => !savedIds.has(id))

    if (newIds.length !== 0) {
      fetch(`${config.API_ROOT}/viveros/stock/${newIds.join(',')}`)
        .then(res => res.ok && res.json())
        .then(result => {
          if(!result) return

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
