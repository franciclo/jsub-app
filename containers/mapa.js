import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initMap } from '../utils/map'
import { setVisibleViveros } from '../actions/viveros'

class mapa extends Component {
  constructor (props) {
    super(props)
    this.map = null
    this.state = {
      mbSuported: true
    }
  }
  componentDidMount () {
    this.map = initMap(this.onMapLoad)
  }

  getVisisbleViveros = () => {
    return () => {
      const features = this.map.queryRenderedFeatures({
         layers: ['viveros-points']
      }) || []
      const viverosIds = [...new Set(features.map(f => f.properties.id))]
      console.log('viverosIds', viverosIds)
      this.props.setVisibleViveros(viverosIds)
    }
  }

  onMapLoad = () => {
    const getVV = this.getVisisbleViveros()
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
          features: viveros.all.map(v => {
            v.properties.total = vivero.properties.stock.reduce((acc, s) => {
              const cantidades = Object.keys(s).filter(k => k !== 'especie')
              const total = cantidades.reduce((acc, v) => s[v] + acc, 0)
              return total + acc
            }, 0)
            delete v.properties.stock
            return v
          })
        })
      console.log( viveros.all.map(v => {
        v.properties.total = vivero.properties.stock.reduce((acc, s) => {
          const cantidades = Object.keys(s).filter(k => k !== 'especie')
          const total = cantidades.reduce((acc, v) => s[v] + acc, 0)
          return total + acc
        }, 0)
        delete v.properties.stock
        return v
      }))
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
  state => ({ viveros: state.viveros }),
  { setVisibleViveros }
)(mapa)

export default Mapa
