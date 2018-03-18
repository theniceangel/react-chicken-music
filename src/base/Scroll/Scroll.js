import React from 'react'
import BScroll from 'better-scroll'
import PropTypes from 'prop-types'
import './index.stylus'

export default class Scroll extends React.Component {
  constructor (props) {
    super(props)
    this._initScroll = this._initScroll.bind(this)
  }

  componentDidMount () {
    this._initScroll()
  }
  _scrollToElement (ele, time) {
    this.scroll.scrollToElement(ele, time)
  }
  _initScroll () {
    if (!this.dom) return
    this.scroll = new BScroll(this.dom, {
      probeType: this.props.probeType,
      click: this.props.click
    })
    if (this.props.listenScroll) {
      this.scroll.on('scroll', (pos) => {
        this.props.scroll(pos)
      })
    }
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
  click: false,
  listenScroll: false
}
Scroll.propTypes = {
  probeType: PropTypes.number,
  click: PropTypes.bool,
  listenScroll: PropTypes.bool
}
