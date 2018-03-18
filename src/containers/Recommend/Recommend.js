import React from 'react'
import './index.stylus'
import Slider from 'src/base/Slider/Slider'
import Scroll from 'src/base/Scroll/Scroll'
import MusicList from 'src/containers/Music-List/Music-List'
import { getRecommend, getDiscList } from 'src/api/recommend'
import { Route } from 'react-router-dom'
import { ERR_OK } from 'src/api/config'
import { connect } from 'react-redux'
import { SET_DISC } from 'src/store/action-types'
class Recommend extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sliderList: [],
      recommendList: []
    }
    this.pushToMusicList = this.pushToMusicList.bind(this)
  }
  
  componentWillMount () {
    this._getRecommend()
    this._getDiscList()
  }
  
  _getRecommend () {
    getRecommend().then((res) => {
      if (res.code === ERR_OK) {
        this.setState({
          sliderList: res.data.slider
        })
      }
    })
  }
  
  _getDiscList () {
    getDiscList().then((res) => {
      if (res.code === ERR_OK) {
        this.setState({
          recommendList: res.data.list
        })
      }
    })
  }
  
  pushToMusicList (data) {
    let id = data.dissid
    this.props.selectItem(data)
    this.props.history.push(`/recommend/${id}`)
  }
  
  render () {
    let { sliderList, recommendList } = this.state
    return (
      <div className="recommend-bs-container">
        <Scroll>
          <div className="scroll-wrapper">
            <div className="slider-wrapper">
              <div className="slider-content">
                <Slider>
                  { sliderList.map((data) => <div className="slider-img-box" key={ data.id }>
                    <img src={ data.picUrl } alt=""/>
                  </div>) }
                </Slider>
              </div>
            </div>
            <div className="recommend-container">
              <h1 className='recommend-title'>热门歌单</h1>
              <ul>
                { recommendList.map((data) => <li onClick={() => { this.pushToMusicList(data) }} className="item" key={ data.dissid }>
                  <div className="icon"><img src={ data.imgurl } alt="" width='60px' height='60px'/></div>
                  <div className="text">
                    <h2 className="name">{ data.creator.name }</h2>
                    <p className="desc">{ data.dissname }</p>
                  </div>
                </li>) }
              </ul>
            </div>
          </div>
        </Scroll>
        <Route path={`${this.props.match.url}/:id`} component={ MusicList }/>
      </div>
    )
  }
}
const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    selectItem: (item) => {
      dispatch({
        type: SET_DISC,
        disc: item
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(Recommend)
