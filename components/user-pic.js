import React, {Component} from 'react'

export default class UserPic extends Component {
  render() {
    const { src, showUserBox } = this.props
    return (
      <div
        onClick={showUserBox}
        style={{
          overflow: 'hidden',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          backgroundImage: `url(${src})`,
          backgroundSize: '32px 32px',
          cursor: 'pointer'
        }}>
      </div>
    )
  }
}
