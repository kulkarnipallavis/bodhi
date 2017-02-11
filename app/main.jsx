'use strict'

import React from 'react'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { auth } from './firebase'

import store from './store'

import App from './components/App'
import Navbar from './components/utilities/Navbar'
import MapContainer from './components/MapContainer'
import OfferHelp from './components/OfferHelp'
import Request from './components/Request'
import Signup from './components/Signup'
import Login from './components/Login'
import LoginSignup from './components/LoginSignup'
import Profile from './components/Profile'
import EditableProfile from './components/EditableProfile'
import InvitePage from './components/Invite'
import OfferHelpMessage from './components/OfferHelpMessage'
import Feed from './components/HomeLoggedIn'
import AllOffers from './components/AllOffers'
import Landing from './components/HomeLoggedOut'

import {getOpenRequests, getAcceptedOffers} from './reducers/home'
import { loggedIn, loggedOut } from './reducers/auth'
import { getAllMarkers, grabUserLocation } from './reducers/map'
import { findOffers } from './reducers/receive-help'
import Network from './components/Network'

let offersListener = null
let userListener = null

auth().onAuthStateChanged(function(user) {
  if (user) {
    userListener = store.dispatch(loggedIn(user))
    offersListener = store.dispatch(findOffers(user.uid))
  } else {
    store.dispatch(loggedOut())
    userListener && userListener()
    offersListener && offersListener()
    browserHistory.push('/loginsignup')
  }
})

const onEnterApp = () => {
  store.dispatch(grabUserLocation())
  store.dispatch(getAllMarkers())
}

const onFeedEnter = () => {
  store.dispatch(getOpenRequests())
  store.dispatch(getAcceptedOffers())
}

const onLoginEnter = () => {
  auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      browserHistory.push('/feed')
    }
  })
}



injectTapEventPlugin()

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/nb' component={Navbar} />
      <Route path="/" component={App} onEnter={onEnterApp}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={Landing} />
        <Route path="/feed" component={Feed} onEnter={onFeedEnter} />
        <Route path="/map" component={MapContainer} />
        <Route path="/request" component={Request} />
        <Route path="/offerhelp" component={OfferHelp} />
        <Route path="/offerhelpmessage" component={OfferHelpMessage} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/loginsignup" component={LoginSignup} onEnter={onLoginEnter} />
        <Route path="/profile" component={Profile} />
        <Route path="/editprofile" component={EditableProfile} />
        <Route path="/invitefriends" component={InvitePage} />
        <Route path="/offers" component={AllOffers} />
        <Route path="/network" component={Network} />
      </Route>
    </Router>
  </Provider>,

  document.getElementById('main')
)
