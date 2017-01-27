'use strict'

import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';

import store from './store'
import App from './components/App'
import MapContainer from './components/MapContainer'
import OfferHelp from './components/OfferHelp'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Request from './components/Request'
import Signup from './components/Signup'

const onEnterApp = () => {
  injectTapEventPlugin()
}

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: "#607D8B",
  }
});

render(

  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App} onEnter={onEnterApp}>
          <Route path="/map" component={MapContainer} />
          <Route path="/request" component={Request}/>
          <Route path="/offerhelp" component={OfferHelp} />
          <Route path="/signup" component={Signup} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,

  document.getElementById('main')
)
