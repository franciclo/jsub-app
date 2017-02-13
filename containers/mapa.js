import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initMap } from '../utils/map'
import { setVisibleViveros, totalPorEspecie } from '../actions/viveros'

class mapa extends Component {
  constructor (props) {
    super(props)
    this.state = { mapLoaded: false }
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

  onMapLoad = (e) => {
    this.setState({mapLoaded: true})

    const isStockLoaded = this.map.isSourceLoaded('viveros-stock')
    if(!isStockLoaded) return
    this.map.off('tiledata', this.onMapLoad)

    const getVV = this.getVisibleViveros()
    this.map.on('movestart', getVV)
    this.map.on('moveend', getVV)
    getVV()
  }

  render() {
    if (
      this.map &&
      this.state.mapLoaded &&
      this.map.isSourceLoaded('viveros-stock')
    ) {
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

function setTotalViveros (viveros, especie) {
  return Object.keys(viveros)
    .map(viveroId => {
      const vivero = viveros[viveroId]
      return Object.assign({}, vivero,
        { properties: { total: vivero.properties.totales[especie] } })
      })
}

const Mapa = connect(
  state => ({ viveros: setTotalViveros(state.viveros.all, state.especies.active) }),
  { setVisibleViveros }
)(mapa)

export default Mapa
