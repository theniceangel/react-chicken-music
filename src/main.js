/* eslint-disable*/
import React, {Component} from 'react'
import ReactDom from 'react-dom'
class Test extends Component {
  render () {
    return <h1>hello world</h1>
  }
}
ReactDom.render(<Test />, document.getElementById('app'))
