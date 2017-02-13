import fetch from 'isomorphic-fetch'
import config from '../config.json'
import { setVisibleEspecies } from '../actions/especies'

export const SET_VISIBLE_VIVEROS = 'SET_VISIBLE_VIVEROS'
export const ADD_VIVEROS = 'ADD_VIVEROS'

function getTotales (stock) {
  return {
    ...stock
      .reduce((especiesAcc, subStock) => {
        const hasEspecie = ~Object.keys(especiesAcc).indexOf(subStock.especie)
        const subTotal = subStock.cantidades.reduce((total, tamagno) => total + tamagno.cantidad, 0)
        especiesAcc[subStock.especie] = hasEspecie ? especiesAcc[subStock.especie] + subTotal : subTotal
        return especiesAcc
      },{}),
    ...{
      ALL: stock.reduce((acc, subStock) => {
        const total = subStock.cantidades.reduce((acc, item) => item.cantidad + acc, 0)

        return total + acc
      }, 0)
    }
  }
}

export function setVisibleViveros(ids) {
  return async function (dispatch, getState) {
    const { viveros, especies } = getState()

    const newIds = ids.filter(id => !~Object.keys(viveros.all).indexOf(id))

    if (newIds.length === 0) return dispatch({
      type: SET_VISIBLE_VIVEROS,
      ids
    })

    console.log('hay nuevos viveros', ids, Object.keys(viveros.all), newIds)
    const result = await fetch(`${config.API_ROOT}/viveros/${newIds.join(',')}`)
      .then(res => res.ok && res.json())
    if (!result) return console.error('viveros response not ok')

    dispatch({
      type: ADD_VIVEROS,
      viveros: result.reduce(
        (acc, viv) => {
          viv.properties.totales = getTotales(viv.properties.stock)
          acc[viv.properties.id] = viv
          return acc
        },
        {}
      )
    })

    dispatch({
      type: SET_VISIBLE_VIVEROS,
      ids
    })

    const newEspeciesIds = Object.keys(getState().viveros.stock)
      .filter(id => !~Object.keys(especies.all).indexOf(id))
    if(newEspeciesIds.length > 0) dispatch(setVisibleEspecies(newEspeciesIds))
  }
}

const mapVisibleViveros = viveros => (acc, id) => { acc[id] = viveros[id]; return acc }

const loc = (key, array) => array.map(v => v.key).indexOf(key)

function mergeTipos (tipos = {}, cantidad) {
  tipos[cantidad.tipo] = (tipos[cantidad.tipo] || 0) + cantidad.cantidad

  return tipos
}

function mergeViverosStock(viveros){
  return function(stock, viveroId) {
    return viveros[viveroId].properties.stock.reduce((mStk, vivStock) => {
      mStk[vivStock.especie] = vivStock.cantidades.reduce(mergeTipos, mStk[vivStock.especie])
      return mStk
    }, stock)
  }
}

function addTotal (stock) {
  for(var especie in stock) {
    stock[especie].total = Object.keys(stock[especie]).reduce((total, v) => total + stock[especie][v], 0)
  }
  return stock
}

export default function reducer(state = {
  visible: {},
  all: {},
  stock: {}
}, action) {
  switch (action.type) {
    case SET_VISIBLE_VIVEROS:
      return Object.assign({}, state, {
        visible: action.ids.reduce(mapVisibleViveros(state.all), {}),
        stock: addTotal(action.ids.reduce(mergeViverosStock(state.all), {}))
      })
    case ADD_VIVEROS:
      return Object.assign({}, state, {
        all: {...state.all, ...action.viveros}
      })
    default:
      return state
  }
}
