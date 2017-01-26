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
import OfferHelp from './components/OfferHelp'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import {green100, green500, green700} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

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

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: "#607D8B",
  }
});

render (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={ExampleApp}>
          <IndexRedirect to="/jokes" />
          <Route path="/jokes" component={Jokes} />
          <Route path="/map" component={MapContainer} />
        </Route>
        <Route path="/offerhelp" component={OfferHelp} />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('main')
)
