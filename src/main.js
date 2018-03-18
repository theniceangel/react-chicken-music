/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Mheader from 'components/Mheader/Mheader'
import Recommend from 'containers/Recommend/Recommend'
import Singers from 'containers/Singers/Singers'
import Rank from 'containers/Rank/Rank'
import TabLinkList from 'containers/Tab/Tab'
import store from 'src/store'
import 'src/common/stylus/index.stylus'

ReactDom.render(
  <Provider store={ store }>
    <Router>
      <div>
        <Mheader/>
        <TabLinkList/>
        <Switch>
          <Route path="/recommend" component={ Recommend }/>
          <Route path="/singers" component={ Singers }/>
          <Route path="/rank" component={ Rank }/>
          <Redirect exact from="/" to="/recommend"/>
        </Switch>
      </div>
    </Router>
  </Provider>
  , document.getElementById('app')
)
