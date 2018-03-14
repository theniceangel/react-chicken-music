import React from 'react'
import './index.stylus'
import Slider from 'src/base/Slider/Slider'
import Scroll from 'src/base/Scroll/Scroll'
import { getRecommend, getDiscList } from 'src/api/recommend'
import { ERR_OK } from 'src/api/config'

export default class Recommend extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sliderList: [],
      recommendList: []
    }
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

  render () {
    let {sliderList, recommendList} = this.state
    return (
      <div className="recommend-bs-container">
        <Scroll>
          <div className="scroll-wrapper">
            <div className="slider-wrapper">
              <div className="slider-content">
                <Slider>
                  {sliderList.map((data) => <div className="slider-img-box" key={data.id}><img src={data.picUrl} alt=""/>
                  </div>)}
                </Slider>
              </div>
            </div>
            <div className="recommend-container">
              <h1 className='recommend-title'>热门歌单</h1>
              <ul>
                {recommendList.map((data) => <li className="item" key={data.dissid}>
                  <div className="icon"><img src={data.imgurl} alt="" width='60px' height='60px'/></div>
                  <div className="text">
                    <h2 className="name">{data.creator.name}</h2>
                    <p className="desc">{data.dissname}</p>
                  </div>
                </li>)}
              </ul>
            </div>
          </div>
        </Scroll>
      </div>
    )
  }
}
