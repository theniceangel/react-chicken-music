import React from 'react'
import BScroll from 'better-scroll'
import { addClass } from 'src/common/js/dom'
import classnames from 'classnames'
import './index.stylus'

export default class Slider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dots: [],
      currentPageIndex: 0
    }
    this._onScrollEnd = this._onScrollEnd.bind(this)
  }

  componentDidMount () {
    setTimeout(() => {
      this._initSlider()
      this._setSliderWidth()
      this._initDots()
      if (this.props.autoPlay) {
        this._play()
      }
    }, 200)
  }

  _initSlider () {
    this.slider = new BScroll(this.slide, {
      snap: this.props.snap,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      click: false
    })
    this.slider.on('scrollEnd', this._onScrollEnd)
    this.slider.on('touchend', () => {
      if (this.props.autoPlay) {
        this._play()
      }
    })
    this.slider.on('beforeScrollStart', () => {
      if (this.props.autoPlay) {
        clearTimeout(this.timer)
      }
    })
  }

  _setSliderWidth (isResize) {
    this.children = this.sliderGroup.children
    let width = 0
    let sliderWidth = this.slide.clientWidth
    for (let i = 0; i < this.children.length; i++) {
      let child = this.children[i]
      addClass(child, 'slider-item')
      child.style.width = sliderWidth + 'px'
      width += sliderWidth
    }
    if (this.loop && !isResize) {
      width += 2 * sliderWidth
    }
    this.sliderGroup.style.width = width + 'px'
  }

  _onScrollEnd () {
    let pageIndex = this.slider.getCurrentPage().pageX
    this.setState({
      currentPageIndex: pageIndex
    })
    if (this.props.autoPlay) {
      this._play()
    }
  }

  _initDots () {
    this.setState({
      dots: [...new Array(this.children.length - 2)]
    })
  }

  _play () {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.slider.next()
    }, this.props.interval)
  }

  render () {
    return (
      <div className='slide' ref={(div) => {
        this.slide = div
      }}>
        <div className="slide-group" ref={(div) => {
          this.sliderGroup = div
        }}>
          {this.props.children}
        </div>
        <div className="dots">
          {this.state.dots.map((dot, i) => <span
            className={classnames('dot', {active: i === this.state.currentPageIndex})} key={i}></span>)}
        </div>
      </div>
    )
  }
}
Slider.defaultProps = {
  snap: {
    loop: true,
    threshold: 0.1,
    easing: {
      style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      fn: function (t) {
        return t * (2 - t)
      }
    }
  },
  scrollX: true,
  scrollY: false,
  momentum: false,
  bounce: false,
  click: false,
  autoPlay: true,
  interval: 4000
}
