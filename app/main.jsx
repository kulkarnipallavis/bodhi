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
import LoginSignup from './components/LoginSignup'
import Profile from './components/Profile'
import ViewableProfile from './components/ViewableProfile'
import InvitePage from './components/Invite'
import OfferHelpMessage from './components/OfferHelpMessage'
import Feed from './components/HomeLoggedIn'
import AllOffers from './components/AllOffers'
import Landing from './components/HomeLoggedOut'
import Network from './components/Network'

import { getOpenRequests, getAcceptedOffers } from './reducers/home'
import { loggedIn, loggedOut } from './reducers/auth'
import { getAllMarkers, getUserNetworkMarkers, grabUserLocation } from './reducers/map'
import { findOffers } from './reducers/receive-help'
import { grabUserProfileInfo } from './reducers/users'

let offersListener, currentUserListener

auth().onAuthStateChanged(function(user) {
  if (user) {
    currentUserListener = store.dispatch(loggedIn(user))
    offersListener = store.dispatch(findOffers(user.uid))
    store.dispatch(getUserNetworkMarkers(user.uid))
  } else {
    store.dispatch(loggedOut())
    currentUserListener && currentUserListener()
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



const onProfileEnter = (nextRouterState) => {
  store.dispatch(grabUserProfileInfo(nextRouterState.params.uid))
}

injectTapEventPlugin()

render(
  <Provider store={store}>
    <Router history={browserHistory}>
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
        <Route path="/profile/:uid" component={ViewableProfile} onEnter={onProfileEnter} />
        <Route path="/editprofile" component={Profile} />
        <Route path="/invitefriends" component={InvitePage} />
        <Route path="/notifications" component={AllOffers} />
        <Route path="/network" component={Network} />
      </Route>
    </Router>
  </Provider>,

  document.getElementById('main')
)
