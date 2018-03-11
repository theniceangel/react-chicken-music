import React from 'react'
import './index.stylus'
export default class Mheader extends React.Component {
  render () {
    return (
      <div className='m-header'>
        <i className='m-header-logo'></i>
        <h2>Chicken Music</h2>
        <div className='m-header-mine'>
          <i className='icon-mine'></i>
        </div>
      </div>
    )
  }
}
