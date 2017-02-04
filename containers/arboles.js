import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadArboles} from '../actions/arboles'

class arboles extends Component {
  componentDidMount () {
    // this.props.loadArboles()
  }

  render() {
    return (
      <div>
        {
          JSON.stringify(this.props.arboles.data)
        }
      </div>
    )
  }
}
const Arboles = connect(
  state => state,
  { loadArboles }
)(arboles)

export default Arboles

// 
// vivero.properties.stock.map(s => {
//             const cantidades = Object.keys(s).filter(k => k !== 'especie')
//             const total = cantidades.reduce((acc, v) => s[v] + acc, 0)
//             s.total = total
//             return s
//           })
