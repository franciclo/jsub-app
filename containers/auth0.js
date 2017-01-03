import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/auth'

class Auth0 extends Component {
    render () {
      return (
        <button
          onClick={this.props.onlogin}>
          Ingresar
        </button>
      )
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onlogin: () => {
      console.log('login')
      dispatch(login())
    }
  }
}

export default connect(
  state => state,
  mapDispatchToProps
)(Auth0)
