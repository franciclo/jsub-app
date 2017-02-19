import React, { Component } from 'react'
import { connect } from 'react-redux'
import initMap from './init-map'
import { setVisibleProductores } from './module/visible'

class mapa extends Component {
  constructor (props) {
    super(props)
    this.state = { mapLoaded: false }
    this.map = null
  }

  componentDidMount () {
    this.map = initMap(this.onMapLoad)
  }

  getVisibleProductores = () => {
    return () => {
      const features = this.map.queryRenderedFeatures({
         layers: ['viveros-points']
      }) || []

      const uniqueIds = [...new Set(features.map(f => f.properties.id))]
      this.props.setVisibleProductores(uniqueIds)
    }
  }

  onMapLoad = (e) => {
    this.setState({mapLoaded: true})

    const isStockLoaded = this.map.isSourceLoaded('productores-stock')
    if(!isStockLoaded) return

    this.map.off('tiledata', this.onMapLoad)
    this.map.on('movestart', this.getVisibleProductores)
    this.map.on('moveend', this.getVisibleProductores)
    this.getVisibleProductores()
  }

  render() {
    if (
      this.map &&
      this.state.mapLoaded &&
      this.map.isSourceLoaded('productores-stock')
    ) {
      const { productores } = this.props

      this.map.getSource('productores-stock')
        .setData({
          type: 'FeatureCollection',
          features: productores
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

const Mapa = connect(
  state => ({
    productores: Object.keys(state.mapa.productores)
      .map(productorId => {
        const productor = state.mapa.productores[productorId]
        return Object.assign({}, productor, {
          properties: { total: vivero.properties.totales[state.mapa.visible.activeProducto] }
        })
      })
  }),
  { setVisibleProductores }
)(mapa)

export default Mapa
