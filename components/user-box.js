import React, {Component} from 'react'
import ReactOutsideEvent from 'react-outside-event'

export default ReactOutsideEvent(class UserBox extends Component {
  onOutsideEvent (e) {
    if (e.target.className === 'avatar-picture') return
    this.props.onToggleBox()
  }
  render() {
    const {
      picture,
      nickname,
      onLogout
    } = this.props

    return (
      <div
        style={{
          background: '#fff',
          borderRadius: '3px',
          position: 'fixed',
          right: '20px',
          top: '60px',
          minWidth: '200px',
          boxShadow: '0 2px 10px rgba(0,0,0,.2)',
          border: '1px solid rgba(0,0,0,0.2)'
        }}>
        <div
          style={{
            display: 'flex',
            padding: '10px',
            alignItems: 'center',
            justifyContent: 'space-around'
          }}>
          <svg
            style={{
              margin: '0 auto',
              width: '20px',
              height: '9px',
              position: 'absolute',
              top: '-9px',
              right: '17px'

            }}>
            <polygon
              style={{
                fill: '#fff',
                stroke: 'rgba(0,0,0,0.2)'
              }}
              points="10 0, 20 10, 0 10"/>
          </svg>
          <div
            style={{
              overflow: 'hidden',
              borderRadius: '50%',
              width: '70px',
              height: '70px',
              backgroundImage: `url(${picture})`,
              backgroundSize: '70px 70px'
            }}>
          </div>
          <div
            style={{
              marginLeft: '10px',
              color: 'rgba(0,0,0,0.6)'
            }}>
            { nickname }
          </div>
        </div>
        <div
          style={{
            background: 'rgba(0,0,0,0.05)',
            padding: '5px',
            textAlign: 'right',
            borderTop: '1px solid rgba(0,0,0,0.07)'
          }}>
          <button
            onClick={onLogout}
            style={{
              background: 'rgba(255, 255, 255, 0.3)',
              color: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '3px',
              padding: '7px 11px',
              fontSize: '13px',
              cursor: 'pointer',
              outline: 'none'
            }}>
            Cerrar sesión
          </button>
        </div>
      </div>
    )
  }
})
