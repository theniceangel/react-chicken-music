/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Mheader from 'components/Mheader/Mheader'
import Recommend from 'containers/Recommend/Recommend'
import Singers from 'containers/Singers/Singers'
import TabLinkList from 'containers/TabLinkList/TabLinkList'
import 'src/common/stylus/index.stylus'

ReactDom.render(
  <Router>
    <div>
      <Mheader/>
      <TabLinkList/>
      <Switch>
        <Route path="/recommend" component={Recommend}/>
        <Route path="/singers" component={Singers}/>
        <Redirect from="/" to="/recommend"/>
      </Switch>
    </div>
  </Router>
  , document.getElementById('app')
)
