'use strict'

import React from 'react'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'
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
import InvitePage from './components/Invite'

import Home from './components/Home'
import AllOffers from './components/AllOffers'
import {getOpenRequests, getAcceptedOffers} from './reducers/home'
import { loggedIn, loggedOut } from './reducers/auth'

import { grabUserLocation } from './reducers/map'

import { findOffers } from './reducers/receive-help'

let offersListener = null

auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch(loggedIn(user))
    offersListener = store.dispatch(findOffers(user.uid))
  } else {
    store.dispatch(loggedOut())
    offersListener && offersListener()
    browserHistory.push('/')
  }
})

const onEnterApp = () => {
  store.dispatch(grabUserLocation())
}

const onHomeEnter = () => {
  store.dispatch(getOpenRequests())
  store.dispatch(getAcceptedOffers())
}

const onLoginEnter = () => {

  auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    browserHistory.push('/')
  }
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
});
}

injectTapEventPlugin()

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={onEnterApp}>
        <IndexRedirect to="/home"/>
        <Route path="/map" component={MapContainer} />
        <Route path="/request" component={Request} />
        <Route path="/offerhelp" component={OfferHelp} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/loginenter" component={LoginEnter} onEnter={onLoginEnter}/>
        <Route path="/profile" component={Profile} />
        <Route path="/editprofile" component={EditableProfile} />
        <Route path="/invitefriends" component={InvitePage} />
        <Route path="/home" component={Home} onEnter={onHomeEnter} />
        <Route path="/offers" component={AllOffers} />
      </Route>
    </Router>
  </Provider>,

  document.getElementById('main')
)
