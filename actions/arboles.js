import { CALL_API } from '../store/api-middleware'

export const ARBOLES_REQUEST = 'ARBOLES_REQUEST'
export const ARBOLES_SUCCESS = 'ARBOLES_SUCCESS'
export const ARBOLES_FAILURE = 'ARBOLES_FAILURE'

export function fetchArboles() {
  return {
    [CALL_API]: {
      types: [ ARBOLES_REQUEST, ARBOLES_SUCCESS, ARBOLES_FAILURE ],
      endpoint: 'test',
      authenticatedRequest: false
    }
  }
}

export function loadArboles() {
  return dispatch => {
    return dispatch(fetchArboles())
  }
}



export const MAS_ARBOLES_REQUEST = 'MAS_ARBOLES_REQUEST'
export const MAS_ARBOLES_SUCCESS = 'MAS_ARBOLES_SUCCESS'
export const MAS_ARBOLES_FAILURE = 'MAS_ARBOLES_FAILURE'

export function fetchMasArboles(token) {
  return {
    [CALL_API]: {
      types: [ MAS_ARBOLES_REQUEST, MAS_ARBOLES_SUCCESS, MAS_ARBOLES_FAILURE ],
      endpoint: 'testt',
      authenticatedRequest: true,
      token
    }
  }
}

export function loadMasArboles(tk) {
  return dispatch => {
    return dispatch(fetchMasArboles(tk))
  }
}



export default function reducer(state = {
  isFetching: false,
  data: [],
  misArboles: [],
  error: ''
}, action) {
  switch (action.type) {
    case ARBOLES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case ARBOLES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.response,
        error: ''
      })
    case ARBOLES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        data: [],
        error: action.error
      })
    case MAS_ARBOLES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case MAS_ARBOLES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        misArboles: action.response,
        error: ''
      })
    case MAS_ARBOLES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        misArboles: [],
        error: action.error
      })
    default:
      return state
  }
}
