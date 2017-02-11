import React, { Component } from 'react'
import { connect } from 'react-redux'
import EspecieCard from '../components/especie-card'
import { totalPorEspecie, setActiveEspecie } from '../actions/viveros'

class arboles extends Component {
  render() {
    const { arboles, especies, handleActiveEspecie } = this.props
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
            arboles && arboles.map((arbol, i) => {
              return (
                <EspecieCard
                  key={i}
                  cantidad={arbol.cantidad}
                  especie={{ label: especies[arbol.especie], id: arbol.especie }}
                  handleActiveEspecie={handleActiveEspecie} />
              )
            })
          }
        </div>
      </div>
    )
  }
}

function getVisibleArboles(viveros, visibleIds) {
  return viveros.reduce((arbolesAcc, vivero) => {
    if(!~visibleIds.indexOf(vivero.properties.id)) return arbolesAcc

    const viveroTotalPorEspecie = totalPorEspecie(vivero)

    const especiesVisibles = arbolesAcc.map(a => a.especie)
    Object.keys(viveroTotalPorEspecie).forEach(especie => {
      const especieI = especiesVisibles.indexOf(especie)
      if(~especieI) {
        arbolesAcc[especieI].cantidad = arbolesAcc[especieI].cantidad + viveroTotalPorEspecie[especie]
      }else {
        arbolesAcc.push({
          especie: especie,
          cantidad: viveroTotalPorEspecie[especie]
        })
      }
    })

    return arbolesAcc
  }, []).sort((a,b) => b.cantidad - a.cantidad)
}

const Arboles = connect(
  state => ({
    arboles: getVisibleArboles(state.viveros.all, state.viveros.visible),
    especies: state.especies
  }),
  dispatch => ({
    handleActiveEspecie: especie => { dispatch(setActiveEspecie(especie)) }
  })
)(arboles)

export default Arboles
