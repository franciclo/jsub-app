import React, {Component} from 'react'
import {connect} from 'react-redux'
import {initMap} from '../utils/map'

class mapa extends Component {
  componentDidMount () {
    initMap(this.onMapLoad)
  }

  updateVisisbleViveros(map) {
    return () => {
      const features = map.queryRenderedFeatures({
         layers: ['viveros-data']
      }) || []
      const userIds = features.map(f => f.properties.user)
      this.props.store.dispatch({
        type: 'SET_VISIBLE_VIVEROS_IDS',
        viveros: userIds
      })
      console.log(userIds)
    }
  }

  onMapLoad = (map) => {
    console.log('map load')
    map.on('movestart', this.updateVisisbleViveros(map))
    map.on('moveend', this.updateVisisbleViveros(map))
    this.updateVisisbleViveros(map)()
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
  state => state
)(mapa)

export default Mapa
