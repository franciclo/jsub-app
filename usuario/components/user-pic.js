import React, {Component} from 'react'

export default ({ picture, onToggleBox, boxVisible }) => (
  <div
    className='avatar-picture'
    onClick={onToggleBox}
    style={{
      overflow: 'hidden',
      borderRadius: '50%',
      width: '32px',
      height: '32px',
      backgroundImage: `url(${picture})`,
      backgroundSize: '32px 32px',
      cursor: 'pointer'
    }}>
  </div>
)
