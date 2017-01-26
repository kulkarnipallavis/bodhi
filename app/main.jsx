'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, hashHistory, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import MapContainer from './components/MapContainer'
// import firebase, {database} from '../firebase.jsx';

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)

const onMapEnter = () => {
  // TODO: Move getMarkers dispatch in here.
}

render (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/jokes" />
        <Route path="/jokes" component={Jokes} />
        <Route path="/map" component={MapContainer} onEnter={onMapEnter}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
