import fetch from 'isomorphic-fetch'
import createReducer from '../../store/create-reducer'
import config from '../../config.json'
import { getTotales } from './selectors'

export function getProductores (ids) {
  return fetch(`${config.API_ROOT}/productores/${newIds.join(',')}`)
    .then(res => res.ok && res.json())
    .then(res => {
      if (!res) return Promise.reject()

      const newProductores = result.reduce(
        (acc, pres) => {
          pres.properties.totales = getTotales(pres.properties.stock)
          acc[pres.properties.id] = pres
          return acc
        },
        {}
      )

      addProductores(newProductores)
      return Promise.resolve()
    })
}

export const ADD_PRODUCTORES = 'ADD_PRODUCTORES'

export function addProductores (productores) {
  return {
    type: ADD_PRODUCTORES,
    productores: productores
  }
}

export default const reducer = createReducer({}, {
  ADD_PRODUCTORES: (state, action) => ({ ...state, ...action.productores })
})
