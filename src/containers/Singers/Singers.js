import React from 'react'
import './index.stylus'
import { getSingerList } from 'src/api/singers'
import IndexList from 'src/base/Index-List/Index-List'
import createSinger from 'common/js/singer'
import { ERR_OK } from 'src/api/config'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
export default class Singers extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      singersList: [],
      shortCutsList: []
    }
  }

  componentWillMount () {
    this._getSingerList()
  }

  normalizeList (list) {
    let map = {
      hot: {
        title: HOT_NAME,
        items: []
      }
    }
    list.forEach((item, index) => {
      if (index <= HOT_SINGER_LEN) {
        map.hot.items.push(createSinger({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      }
      const key = item.Findex
      if (!map[key]) {
        map[key] = {
          title: key,
          items: []
        }
      }
      map[key].items.push(createSinger({
        id: item.Fsinger_mid,
        name: item.Fsinger_name
      }))
    })

    // 为了得到有序列表，我们需要处理 map
    let ret = []
    let hot = []
    for (let key in map) {
      let val = map[key]
      if (val.title.match(/[a-zA-Z]/)) {
        ret.push(val)
      } else if (val.title === HOT_NAME) {
        hot.push(val)
      }
    }
    ret.sort((a, b) => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0)
    })
    return hot.concat(ret)
  }

  _getSingerList () {
    getSingerList().then((res) => {
      if (res.code === ERR_OK) {
        let singersList = this.normalizeList(res.data.list)
        let shortCutsList = singersList.map(data => data.title.substr(0, 1))
        this.setState((prevState) => {
          return {
            singersList,
            shortCutsList
          }
        })
      }
    })
  }

  render () {
    return (
      <div className="singers">
        <IndexList singersList={this.state.singersList} shortCutsList={this.state.shortCutsList}/>
      </div>
    )
  }
}
