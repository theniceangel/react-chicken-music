import React from 'react'
import './index.stylus'
import Slider from 'src/base/Slider'
import { getRecommend, getDiscList } from 'src/api/recommend'
import { ERR_OK } from 'src/api/config'

export default class Recommend extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sliderData: [],
      recommendList: []
    }
  }

  componentWillMount () {
    this._getRecommend()
  }

  _getRecommend () {
    getRecommend().then((res) => {
      console.log(res)
      if (res.code === ERR_OK) {
        this.setState({
          sliderData: res.data.slider
        })
      }
    })
  }
  _getDiscList () {
    getDiscList().then((res) => {
      console.log(res)
      if (res.code === ERR_OK) {
        this.setState({
          recommendList: res.data.recommendList
        })
      }
    })
  }
  render () {
    let {sliderData} = this.state
    return (
      <div>
        <div className="slider-wrapper">
          <div className="slider-content">
            <Slider>
              {sliderData.map((data) => <div className="slider-img-box" key={data.id}><img src={data.picUrl} alt=""/>
              </div>)}
            </Slider>
          </div>
        </div>
        <div className="recommend-container">
          <h1 className='recommend-title'>热门歌单</h1>
        </div>
      </div>
    )
  }
}
