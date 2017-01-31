'use strict'

import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { auth } from './firebase'

import store from './store'
import App from './components/App'
import MapContainer from './components/MapContainer'
import OfferHelp from './components/OfferHelp'
import Request from './components/Request'
import Signup from './components/Signup'
import Login from './components/Login'
import LoginEnter from './components/LoginEnter'
import Profile from './components/Profile'

import { loggedIn, loggedOut } from './reducers/auth'

auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(loggedIn(user))
  } else {
    store.dispatch(loggedOut())
  }
})

const onEnterApp = () => {
  injectTapEventPlugin()
  //get currently signed-in user
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={onEnterApp}>
        <Route path="/map" component={MapContainer} />
        <Route path="/request" component={Request}/>
        <Route path="/offerhelp" component={OfferHelp} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/loginenter" component={LoginEnter} />
          <Route path="/profile" component={Profile} />
        </Route>
      </Router>
    </Provider>,

  document.getElementById('main')
)
