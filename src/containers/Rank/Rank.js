import React from 'react'
import Scroll from 'src/base/Scroll/Scroll'
import { getTopList } from 'src/api/rank'
import { ERR_OK } from 'src/api/config'
import './index.stylus'
export default class Singers extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      probeType: 1,
      list: []
    }
  }
  
  componentWillMount () {
    this._getTopList()
  }
  _getTopList () {
    getTopList().then((res) => {
      if (res.code === ERR_OK) {
        let list = res.data.topList
        this.setState({
          list
        })
      }
    })
  }
  render () {
    return (
      <div className="rank-bs-container">
        <Scroll probeType={ this.state.probeType }>
          <ul>
            { this.state.list.map((item, index) => {
              return (
                <li key={ item.id } className="item">
                  <div className="icon">
                    <img height='100px' width='100px' src={item.picUrl} alt=""/>
                  </div>
                  <ul className="songlist">
                    {item.songList.map((song, index) => {
                      return (
                        <li className="song" key={index}>
                          <span>{index + 1} </span>
                          <span>{`${song.singername}-${song.songname}`}</span>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              )
            }) }
          </ul>
        </Scroll>
      </div>
    )
  }
}
