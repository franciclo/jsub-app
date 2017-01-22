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
  {loadArboles}
)(arboles)

export default Arboles
