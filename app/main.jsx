'use strict'

import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import firebase, { auth } from './firebase'

import store from './store'

import App from './components/App'
import MapContainer from './components/MapContainer'
import OfferHelp from './components/OfferHelp'
import Request from './components/Request'
import Signup from './components/Signup'
import Login from './components/Login'
import LoginEnter from './components/LoginEnter'
import Profile from './components/Profile'
import HomeFeed from './components/Home'
import AllOffers from './components/AllOffers'

import { getAllUsers } from './reducers/users'
import { loggedIn, loggedOut } from './reducers/auth'
import { getAllOffers } from './reducers/offers'
import { getAllRequests } from './reducers/requests'

const onEnterHome = () => {
  auth().onAuthStateChanged(user => {
    if (user) {
      store.dispatch(loggedIn(user))
    } else {
      store.dispatch(loggedOut())
    }
  })

  store.dispatch(getAllRequests())
  store.dispatch(getAllUsers())
  store.dispatch(getAllOffers())
}

injectTapEventPlugin()

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/home"/>
        <Route path="/home" component={HomeFeed} onEnter={onEnterHome}/>
        <Route path="/map" component={MapContainer}/>
        <Route path="/requesthelp" component={Request}/>
        <Route path="/offerhelp" component={OfferHelp}/>
        <Route path="/offers" component={AllOffers}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
        <Route path="/loginenter" component={LoginEnter}/>
        <Route path="/profile" component={Profile}/>
      </Route>
    </Router>
  </Provider>,

  document.getElementById('main')
)
