'use strict'
import React from 'react'
<<<<<<< HEAD
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';

import store from './store'
import App from './components/App'

const onEnterApp = () => {
  injectTapEventPlugin()
}
=======
import {Router, Route, IndexRedirect, hashHistory, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import MapContainer from './components/MapContainer'

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

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={onEnterApp}>
        <Route path="/map" component={MapContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
