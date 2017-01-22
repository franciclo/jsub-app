import React, {Component} from 'react'
import {connect} from 'react-redux'
import {initMap} from '../utils/map'

class mapa extends Component {
  componentDidMount () {
    initMap()
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
