import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initMap } from '../utils/map'
import { setVisibleViveros } from '../actions/viveros'

class mapa extends Component {
  constructor (props) {
    super(props)
    this.map = null
  }

  componentDidMount () {
    this.map = initMap(this.onMapLoad)
  }

  getVisibleViveros = () => {
    return () => {
      const features = this.map.queryRenderedFeatures({
         layers: ['viveros-points']
      }) || []
      const uniqueIds = [...new Set(features.map(f => f.properties.id))]
      this.props.setVisibleViveros(uniqueIds)
    }
  }

  onMapLoad = () => {
    const getVV = this.getVisibleViveros()
    this.map.on('movestart', getVV)
    this.map.on('moveend', getVV)
    getVV()
  }

  render() {
    if (this.map) {
      const { viveros } = this.props
      this.map.getSource('viveros-stock')
        .setData({
          type: 'FeatureCollection',
          features: viveros
        })
    }

    return (
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: -1,
          background: '#eee'
        }}
        id='map'>
      </div>
    )
  }
}

function getTotalesViveros (viveros) {
  return viveros.all.map(vivero => {
    v.properties.total = vivero.properties.stock.cantidades.reduce((acc, cantidades) => {
      const total = cantidades.reduce((acc, item) => item.cantidad + acc, 0)
      return total + acc
    }, 0)
    delete vivero.properties.stock
    return vivero
  })
}

const Mapa = connect(
  state => ({ viveros: getTotalesViveros(state.viveros) }),
  { setVisibleViveros }
)(mapa)

export default Mapa
