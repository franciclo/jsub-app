import fetch from 'isomorphic-fetch'
import config from '../config.json'

export const SET_VISIBLE_VIVEROS = 'SET_VISIBLE_VIVEROS'
export const ADD_VIVEROS = 'ADD_VIVEROS'

export function setVisibleViveros(ids) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_VISIBLE_VIVEROS,
      ids
    })

    const { viveros } = getState()
    const savedIds = new Set(viveros.all.map(v => v.properties.id))
    const newIds = [...new Set(ids.filter(x => !savedIds.has(x)))]
    if (newIds.length) {
      console.log('newIds', newIds)
      fetch(`${config.API_ROOT}/viveros/stock/${newIds.join(',')}`)
        .then(res => res.ok && res.json())
        .then(result => {
          if(!result) return
          dispatch({
            type: ADD_VIVEROS,
            viveros: result
          })
        })
        .catch(err => { console.error('fetch stock error ', err) })
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
