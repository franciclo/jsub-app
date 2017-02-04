import fetch from 'isomorphic-fetch'
import config from '../config.json'

export const SET_VISIBLE_VIVEROS = 'SET_VISIBLE_VIVEROS'

export function setVisibleViveros(ids) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_VISIBLE_VIVEROS,
      ids
    })

    const { viveros } = getState()
    const savedIds = new Set(viveros.all.map(v => id))

    // Diff for new ids and fetch their stock
    const newIds = [...new Set(ids.filter(x => !savedIds.has(x)))]

    if (newIds.length) {
      console.log('fetch stock ', `${config.API_ROOT}/viveros/stock/${newIds.join(',')}`)
      fetch(`${config.API_ROOT}/viveros/stock/${newIds.join(',')}`)
        .then(res => res.text())
        .then(stock => { console.log('llego el stock!!', stock) })
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
    default:
      return state
  }
}
