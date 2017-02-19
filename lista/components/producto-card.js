import React, {Component} from 'react'

export default ({ producto, cantidades, handleActiveProducto }) => (
  <div
    className="producto-card"
    onMouseEnter={e => {
      handleActiveProducto(producto.id)
    }}
    onMouseLeave={e => {
      handleActiveProducto('ALL')
    }}>
    <h1 className="label">
      { producto.label }
    </h1>
    <span className="counter">
      {cantidades.total}
    </span>
    <div className="tamagnos">
      {
        Object.keys(cantidades)
          .filter(k => k !== 'total')
          .map(c => <span key={c}>{c.split('').slice(0, 2)}: {cantidades[c]}</span>)
      }
    </div>
  </div>
)
