import React from 'react'
import { NavLink } from 'react-router-dom'
import './index.stylus'
export default class TabLinkList extends React.Component {
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
      <li className='tab-item' key={tab.id}><NavLink activeClassName='tab-selected' to={tab.path}>{tab.name}</NavLink></li>
    )
    return <ul className='tab-group'>{tabLinkList}</ul>
  }
}
