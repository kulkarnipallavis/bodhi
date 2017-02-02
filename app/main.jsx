'use strict'

import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
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
import EditableProfile from './components/EditableProfile'

import Home from './components/Home'
import AllOffers from './components/AllOffers'
import {getOpenRequests, getClosedRequests} from './reducers/home'
import { loggedIn, loggedOut } from './reducers/auth'
<<<<<<< HEAD

auth().onAuthStateChanged(user => {
=======
import { findOffers } from './reducers/receive-help'


auth().onAuthStateChanged(function(user) {
>>>>>>> 6909625b9cfcd4e7e7566ff645ed7d2fba6e5727
  if (user) {
    store.dispatch(loggedIn(user))
    store.dispatch(findOffers(user.uid))
  } else {
    store.dispatch(loggedOut())
  }
})

const onEnterApp = () => {
  injectTapEventPlugin()

}

const onHomeEnter = () => {
  store.dispatch(getOpenRequests())
  store.dispatch(getClosedRequests())
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={onEnterApp}>
          <Route path="/map" component={MapContainer} />
          <Route path="/request" component={Request} />
          <Route path="/offerhelp" component={OfferHelp} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/loginenter" component={LoginEnter} />
          <Route path="/profile" component={Profile} />
          <Route path="/editableprofile" component={EditableProfile} />
          <Route path="/home" component={Home} onEnter={onHomeEnter} />
          <Route path="/offers" component={AllOffers} />
      </Route>
    </Router>
  </Provider>,

  document.getElementById('main')
);
