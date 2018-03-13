import React from 'react'
import BScroll from 'better-scroll'
import PropTypes from 'prop-types'

export default class Scroll extends React.Component {
  componentDidMount () {
    console.log(this.dom)
    this._initScroll()
  }
  _initScroll () {
    if (!this.dom) return
    this.scroll = new BScroll(this.dom, {
      probeType: this.probeType,
      click: this.click
    })
  }
  render () {
    return (
      <div className='bs-container' ref={(div) => {
        this.dom = div
      }}>{this.props.children}</div>
    )
  }
}
Scroll.defaultProps = {
  probeType: 1,
  click: false
}
Scroll.propTypes = {
  probeType: PropTypes.number,
  click: PropTypes.bool
}
