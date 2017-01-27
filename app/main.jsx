'use strict'

import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
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
import Account from './components/Account'



const onEnterApp = () => {
  injectTapEventPlugin()
  //get currently signed-in user
  const user = auth().currentUser
  if (user) {
    // put user on state?
    console.log('user is signed in. user obj: ', user)
  } else {
    console.log('no user signed in')
  }
}

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} onEnter={onEnterApp}>
        <Route path="/map" component={MapContainer} />
        <Route path="/request" component={Request}/>
        <Route path="/offerhelp" component={OfferHelp} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/loginenter" component={LoginEnter} />
          <Route path="/account" component={Account} />
        </Route>
      </Router>
    </Provider>,

  document.getElementById('main')
)
