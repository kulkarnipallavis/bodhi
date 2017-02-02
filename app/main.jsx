'use strict'

import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
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
// import Profile from './components/Profile'
import Home from './components/Home'
import AllOffers from './components/AllOffers'

import { getAllUsers } from './reducers/users'
import { loggedIn, loggedOut } from './reducers/auth'
import { getUserOffers } from './reducers/offers'
import { getAllRequests } from './reducers/requests'

auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch(loggedIn(user))
    store.dispatch(getUserOffers(user.uid))
  } else {
    store.dispatch(loggedOut())
  }
})

const onEnterApp = () => {
  store.dispatch(getAllRequests())
  store.dispatch(getAllUsers())
}

injectTapEventPlugin()

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={onEnterApp}>
          <IndexRedirect to="/home"/>
          <Route path="/home" component={Home}/>
          <Route path="/map" component={MapContainer}/>
          <Route path="/requesthelp" component={Request}/>
          <Route path="/offerhelp" component={OfferHelp}/>
            <Route path="/offers" component={AllOffers}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/login" component={Login}/>
          <Route path="/loginenter" component={LoginEnter}/>
          {/* <Route path="/profile" component={Profile}/> */}
      </Route>
    </Router>
  </Provider>,

  document.getElementById('main')
)
