'use strict'

import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';

import store from './store'
import App from './components/App'
import MapContainer from './components/MapContainer'
import Request from './components/Request'
import Signup from './components/Signup'

const onEnterApp = () => {
  injectTapEventPlugin()
}

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} onEnter={onEnterApp}>
        <Route path="/map" component={MapContainer} />
        <Route path="/request" component={Request}/>
        <Route path="/signup" component={Signup} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
