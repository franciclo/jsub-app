import React, { Component } from 'react'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import ProductoCard from './components/producto-card'
import { setActiveProducto } from '../mapa/module/visible'

class arboles extends Component {
  render() {
    const { productosVisible, productos, handleActiveProducto } = this.props
    return (
      <div
        style={{
          position: 'fixed',
          top: '0',
          left: '20px',
          overflow: 'hidden',
          width: '300px'
        }}>
        <div
          style={{
            position: 'relative',
            overflow: 'auto',
            width: '280px',
            maxHeight: '100vh',
            borderBox: 'border-box',
            padding: '20px 30px 0 0'

          }}>
          {
            Object.keys(productosVisible) && Object.keys(productosVisible)
              .sort((a, b) => productosVisible[b].total - productosVisible[a].total)
              .map((producto, i) => {
                if(!productos[producto]) return null
                return (
                  <ProductoCard
                    key={i}
                    cantidades={productosVisible[producto]}
                    producto={{ label: productos[producto].label, id: productos[producto].productoId }}
                    handleActiveProducto={handleActiveProducto} />
                )
              })
          }
        </div>
      </div>
    )
  }
}

const Arboles = connect(
  state => ({
    productosVisible: state.mapa.visible.productos,
    productos: state.mapa.productos
  }),
  dispatch => ({
    handleActiveProducto: producto => { dispatch(setActiveProducto(producto)) }
  })
)(arboles)

export default Arboles
