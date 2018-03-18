import React from 'react'
// import Scroll from 'src/base/Scroll/Scroll'
import './index.stylus'
import { getSongList } from 'src/api/recommend'
import { ERR_OK } from 'src/api/config'
import { connect } from 'react-redux'

class MusicList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      data: {}
    }
    this.pushBack = this.pushBack.bind(this)
  }
  
  componentWillMount () {
    this._getSongList(this.state.id)
  }
  
  _getSongList (id) {
    getSongList(id).then((res) => {
      if (res.code === ERR_OK) {
        this.setState({
          data: res.cdlist[0]
        })
      }
    })
  }
  
  pushBack () {
    this.props.history.goBack()
  }
  
  render () {
    return (
      <div className="music-list-container">
        <div className="back" onClick={ this.pushBack }>
          <i className="icon-back"></i>
        </div>
        <h1 className="title">{ this.state.data.dissname }</h1>
        <div className="cover-img" style={ { backgroundImage: `url(${this.state.data.logo})` } }>
        
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    disc: state.disc
  }
}

export default connect(mapStateToProps)(MusicList)
