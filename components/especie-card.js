import React, {Component} from 'react'

export default ({ especie, cantidades, handleActiveEspecie }) => (
  <div
    className="especie-card"
    onMouseEnter={e => {
      handleActiveEspecie(especie.id)
    }}
    onMouseLeave={e => {
      handleActiveEspecie('ALL')
    }}>
    <h1 className="label">
      { especie.label }
    </h1>
    <span className="counter">
      {cantidades.total}
    </span>
    <div className="tamagnos">
      {
        Object.keys(cantidades)
          .filter(k => k !== 'total')
          .map(c => <span key={c}>{c.split('').slice(0, 3)}: {cantidades[c]}</span>)
      }
    </div>
  </div>
)
