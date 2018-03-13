import React from 'react'
import './index.stylus'
import Slider from 'src/base/Slider'
import { getRecommend } from 'src/api/recommend'
import { ERR_OK } from 'src/api/config'

export default class Recommend extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      listData: []
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
          listData: res.data.slider
        })
      }
    })
  }

  render () {
    let {listData} = this.state
    return (
      <div>
        <div className="slider-wrapper">
          <div className="slider-content">
            <Slider>
              {listData.map((data) => <div className="slider-img-box" key={data.id}><img src={data.picUrl} alt=""/></div>)}
            </Slider>
          </div>
        </div>
        <h1 className='recommend-title'>热门歌单</h1>
      </div>
    )
  }
}
