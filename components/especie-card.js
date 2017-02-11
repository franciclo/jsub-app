import React, {Component} from 'react'

export default ({ especie, cantidad, handleActiveEspecie }) => (
  <div
    className="especie-card"
    onMouseEnter={e => {
      handleActiveEspecie(especie.id)
    }}
    onMouseLeave={e => {
      handleActiveEspecie('ALL')
    }}>
    <h1
      style={{
        fontSize: '20px',
        margin: '0'
      }}>
      { especie.label }
    </h1>
    <span
      style={{
        borderRadius: '50%',
        padding: '10px',
        background: '#ff0'
      }}>
      {cantidad}
    </span>
  </div>
)
