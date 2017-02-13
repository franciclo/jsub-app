import React, { Component } from 'react'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import EspecieCard from '../components/especie-card'
import { setActiveEspecie } from '../actions/especies'

class arboles extends Component {
  render() {
    const { stock, especies, handleActiveEspecie } = this.props
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
            Object.keys(stock) && Object.keys(stock)
              .sort((a, b) => stock[b].total - stock[a].total)
              .map((especie, i) => {
                if(!especies.all[especie]) return null
                return (
                  <EspecieCard
                    key={i}
                    cantidad={stock[especie].total}
                    especie={{ label: especies.all[especie].label, id: especies.all[especie].especieId }}
                    handleActiveEspecie={handleActiveEspecie} />
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
    stock: state.viveros.stock,
    especies: state.especies
  }),
  dispatch => ({
    handleActiveEspecie: especie => { dispatch(setActiveEspecie(especie)) }
  })
)(arboles)

export default Arboles
