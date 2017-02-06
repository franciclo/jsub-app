import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {loadArboles} from '../actions/arboles'

class arboles extends Component {
  // componentDidMount () {
  //   this.props.loadArboles()
  // }

  render() {
    const { arboles, especies } = this.props
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
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px',
                    margin: '0 0 10px 0',
                    background: '#fff'
                  }}>
                  <h1
                    style={{
                      fontSize: '20px',
                      margin: '0'
                    }}>
                    {especies[arbol.especie]}
                  </h1>
                  <i
                    style={{
                      borderRadius: '50%',
                      padding: '10px',
                      background: '#ff0'
                    }}>
                    {arbol.cantidad}
                  </i>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

function getVisibleArboles(visibleIds, viveros) {
  return viveros.reduce((arbolesAcc, vivero) => {
    if(!~visibleIds.indexOf(vivero.properties.id)) return arbolesAcc

    const viveroTotalPorEspecie = vivero.properties.stock
      .reduce((especiesAcc, stock) => {
        const hasEspecie = ~Object.keys(especiesAcc).indexOf(stock.especie)
        const subTotal = stock.cantidades.reduce((total, ca) => total + ca.cantidad, 0)
        especiesAcc[stock.especie] = hasEspecie ? especiesAcc[stock.especie] + subTotal : subTotal
        return especiesAcc
      },{})

    const visibleEspecies = arbolesAcc.map(a => a.especie)
    Object.keys(viveroTotalPorEspecie).forEach(especie => {
      const especieI = visibleEspecies.indexOf(especie)
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
    arboles: getVisibleArboles(state.viveros.visible, state.viveros.all),
    especies: state.especies
  })
)(arboles)

export default Arboles
