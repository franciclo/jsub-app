import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMap} from '../utils/map'

class mapa extends Component {
  componentDidMount () {
    getMap()
    // map => {
    //     map.addLayer({
    //         "id": "terrain-data",
    //         "type": "line",
    //         "source": {
    //             type: 'vector',
    //             url: 'mapbox://mapbox.mapbox-terrain-v2'
    //         },
    //         "source-layer": "contour",
    //         "layout": {
    //             "line-join": "round",
    //             "line-cap": "round"
    //         },
    //         "paint": {
    //             "line-color": "#ff69b4",
    //             "line-width": 1
    //         }
    //     });
    //   })
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
          zIndex: -1
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
