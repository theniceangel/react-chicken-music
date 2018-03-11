/* eslint-disable no-unused-vars */
import React, {Component} from 'react'
import { Link } from 'react-router-dom'
export default class TabLinkList extends Component {
  render () {
    const TABS = [
      {
        name: '推荐',
        path: '/recommend',
        id: 1
      },
      {
        name: '歌手',
        path: '/singers',
        id: 2
      },
      {
        name: '排行',
        path: '/rank',
        id: 3
      },
      {
        name: '搜索',
        path: '/search',
        id: 4
      }
    ]
    let tabLinkList = TABS.map((tab) =>
      <li key={tab.id}><Link to={tab.path}>{tab.name}</Link></li>
    )
    return <ul>{tabLinkList}</ul>
  }
}
