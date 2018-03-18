import React from 'react'
import Scroll from 'src/base/Scroll/Scroll'
import './index.stylus'
import classnames from 'classnames'

const HOT_NAME = '热门'
const FIX_TITLE_HEIGHT = 30
const SHORT_CUTS_LIGHT = 18
export default class IndexList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentIndex: 0,
      listenScroll: true,
      probeType: 3,
      fixedListTitle: HOT_NAME
    }
    this.touch = {}
    this._scroll = this._scroll.bind(this)
    this._onShortCutTouchStart = this._onShortCutTouchStart.bind(this)
    this._onShortCutTouchMove = this._onShortCutTouchMove.bind(this)
    this._getDeltaY = this._getDeltaY.bind(this)
  }
  
  shouldComponentUpdate (nextProps) {
    if (nextProps.singersList !== this.props.singersList) {
      setTimeout(() => {
        let listItemsArray = Array.from(this.refs.listItems.children)
        this.heightList = []
        listItemsArray.forEach((dom) => {
          this.heightList.push(dom.offsetTop)
        })
      }, 20)
      return true
    }
    return true
  }
  
  componentWillUnmount () {
    this.setState = (state) => {
      return
    }
  }
  
  _scroll (pos) {
    let { y } = pos
    // change right sidebar shortcuts
    this._setShortCuts(y)
    // change fixed title
    this._setFixedListTitle(y)
    // make fixed title animation
    this._makeFixedTitleAnimation(y)
  }
  
  _setShortCuts (scrollY) {
    let len = this.heightList.length
    if (scrollY >= 0) {
      this.setState({
        currentIndex: 0
      })
      return
    }
    for (let i = 0; i < len - 1; i++) {
      if (-scrollY >= this.heightList[i] && -scrollY < this.heightList[i + 1]) {
        this.setState({
          currentIndex: i
        })
        return
      }
    }
    this.setState({
      currentIndex: len - 1
    })
  }
  
  _setFixedListTitle (scrollY) {
    if (scrollY > 0) {
      this.setState({
        fixedListTitle: ''
      })
      return false
    }
    this.setState({
      fixedListTitle: this.props.singersList[this.state.currentIndex].title
    })
  }
  
  _makeFixedTitleAnimation (scrollY) {
    if (scrollY > 0) {
      return
    }
    let deltaY = this.heightList[this.state.currentIndex + 1] + scrollY
    deltaY = (deltaY > 0 && deltaY < FIX_TITLE_HEIGHT) ? (deltaY - FIX_TITLE_HEIGHT) : 0
    if (this.refs.listFixed) {
      this.refs.listFixed.style.transform = `translate3d(0,${deltaY}px,0)`
    }
  }
  
  _onShortCutTouchStart (e) {
    e.preventDefault()
    let index = Number(e.target.getAttribute('list-index'))
    this.touch.initial = true
    this.touch.startPageY = e.touches[0].pageY
    this.touch.startIndex = index
    this.refs.scroll._scrollToElement(this.refs.listItems.children[index], 0.3)
    this.setState((prevState) => {
      return {
        currentIndex: index
      }
    })
  }
  
  _onShortCutTouchMove (e) {
    e.preventDefault()
    if (!this.touch.initial) return
    this.touch.endPageY = e.touches[0].pageY
    const deltaIndex = this._getDeltaY(this.touch.startPageY, this.touch.endPageY)
    this.refs.scroll._scrollToElement(this.refs.listItems.children[this.touch.startIndex + deltaIndex], 0.3)
    let finnalIndex = Math.max(Math.min(this.touch.startIndex + deltaIndex, this.props.shortCutsList.length - 1), 0)
    this.setState({
      currentIndex: finnalIndex
    })
  }
  
  _getDeltaY (startY, endY) {
    let delta = endY - startY
    let anchorIndex = delta / SHORT_CUTS_LIGHT
    let result = 0
    result = delta > 0 ? Math.ceil(anchorIndex) : Math.floor(anchorIndex)
    return result
  }
  
  render () {
    return (
      <div className="singers-scroll-container">
        <Scroll ref="scroll" listenScroll={ this.state.listenScroll } probeType={ this.state.probeType } scroll={ this._scroll }>
          <ul ref="listItems">
            { this.props.singersList.map((data, index) => <li className="list-group" key={ index }>
              <h2 className="list-group-title">{ data.title }</h2>
              <ul>{ data.items.map((item) => <li className="list-group-item" key={ item.id }>
                <img className="avatar" src={ item.avatar } alt=""/><span className="name">{ item.name }</span></li>) }
              </ul>
            </li>) }
          </ul>
        </Scroll>
        { this.state.fixedListTitle ? <div className="list-fixed" ref="listFixed">
          <h2>{ this.state.fixedListTitle }</h2>
        </div> : null }
        <div className="shortcut-list">
          <ul ref="test" onTouchStart={ this._onShortCutTouchStart } onTouchMove={ this._onShortCutTouchMove }>
            { this.props.shortCutsList.map((item, index) => {
              return (
                <li className={ classnames('item', { current: index === this.state.currentIndex }) } list-index={ index } key={ index }>
                  { item }
                </li>
              )
            }) }
          </ul>
        </div>
      </div>
    )
  }
}
