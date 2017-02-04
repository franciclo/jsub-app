import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initMap } from '../utils/map'
import { setVisibleViveros } from '../actions/viveros'

class mapa extends Component {
  componentDidMount () {
    initMap(this.onMapLoad)
  }

  getVisisbleViveros(map) {
    return () => {
      const features = map.queryRenderedFeatures({
         layers: ['viveros-data']
      }) || []
      const viverosIds = features.map(f => f.properties.id)
      console.log(features)
      this.props.setVisibleViveros(viverosIds)
    }
  }

  onMapLoad = (map) => {
    const getVV = this.getVisisbleViveros(map)
    map.on('movestart', getVV)
    map.on('moveend', getVV)
    getVV()
  }

  render() {
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
  state => state,
  { setVisibleViveros }
)(mapa)

export default Mapa
