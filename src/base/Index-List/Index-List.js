import React from 'react'
import Scroll from 'src/base/Scroll/Scroll'
import './index.stylus'

export default class IndexList extends React.Component {
  render () {
    return (
      <div className="singers-scroll-container">
        <Scroll>
          <ul>
            {this.props.listData.map((data, index) => <li className="list-group" key={index}>
              <h2 className="list-group-title">{data.title}</h2>
              <ul>{data.items.map((item) => <li className="list-group-item" key={item.id}>
                <img className="avatar" src={item.avatar} alt=""/><span className="name">{item.name}</span></li>)}
              </ul>
            </li>)}
          </ul>
        </Scroll>
      </div>
    )
  }
}
