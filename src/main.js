/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Mheader from 'components/Mheader/index'
import Recommend from 'containers/Recommend/index'
import TabLinkList from 'containers/TabLinkList/index'
import 'src/common/stylus/index.stylus'
ReactDom.render(
  <Router>
    <div>
      <Mheader/>
      <TabLinkList />
      <Route path="/recommend" component={Recommend}/>
    </div>
  </Router>
  , document.getElementById('app')
)
