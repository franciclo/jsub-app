import createReducer from '../../../store/create-reducer'
import { addTotal, mergeProductoresStock } from './selectors'
import { getProductores } from './productores'
import { getProductos } from './productos'

export const SET_VISIBLE_PRODUCTORES = 'SET_VISIBLE_PRODUCTORES'

export function visibleProductores (ids) {
  return function (dispatch, getState) {
    const { productores, productos } = getState().mapa

    const newProductoresIds = ids
      .filter(id => !~Object.keys(productores).indexOf(id))

    if (newProductoresIds.length === 0) return dispatch({
      type: SET_VISIBLE_PRODUCTORES,
      ids
    })

    getProductores(newProductoresIds).then(() => {
      const { productos, visible } = getState().mapa

      const newProductosIds = Object.keys(visible.productos)
        .filter(id => !~Object.keys(productos).indexOf(id))

      if(newProductosIds.length === 0) return

      getProductos(newProductosIds)
        .then(() => {
          dispatch({
            type: SET_VISIBLE_PRODUCTORES,
            ids
          })
        })
    })
  }
}

export const SET_ACTIVE_PRODUCTO = 'ACTIVE_PRODUCTO'

export function activeProducto (producto) {
  return {
    type: SET_ACTIVE_PRODUCTO,
    producto
  }
}

function setActiveProducto (state, action) {
  return { ...state, ...{ activeProducto: action.producto } }
}

function setVisibleProductores (state, action) {
  return { ...state, ...{
    productores: action.ids,
    productos: addTotal(action.ids.reduce(mergeProductoresStock(state.mapa.productores), {}))
  } }
}

const reducer = createReducer({
  activeProducto: 'ALL',
  productos: {},
  productores: []
}, {
  ACTIVE_PRODUCTO: setActiveProducto,
  SET_VISIBLE_PRODUCTORES: setVisibleProductores
})

export default reducer
