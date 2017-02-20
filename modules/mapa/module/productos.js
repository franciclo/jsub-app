import fetch from 'isomorphic-fetch'
import createReducer from '../../../store/create-reducer'
import config from '../../../config.json'

export function setVisibleProductos(newIds) {
  return async function(dispatch, getState) {
    const { productos } = getState()
    console.log('nuevos productos ids', Object.keys(productos), newIds)
    const result = await fetch(`${config.API_ROOT}/productos/${newIds.join(',')}`)
      .then(res => res.ok && res.json())

    const newProductos = result.reduce((acc, pro) => {
        acc[esp.productoId] = pro
        return acc
      }, {})

    addProductos(newProductos)
  }
}

export const ADD_PRODUCTOS = 'ADD_PRODUCTOS'

export function addProductos (productos) {
  return {
    type: ADD_PRODUCTOS,
    productos: productos
  }
}

const reducer = createReducer({}, {
  ADD_PRODUCTOS: (state, action) => ({ ...state, ...action.productos })
})

export default reducer
