import React, { Component } from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Theme from '../theme'
import Navbar from './utilities/Navbar'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muitheme={Theme}>
        <div>
          <Navbar />
          { this.props.children && React.cloneElement(this.props.children, this.props) }
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    children: ownProps.children
  }
}

export default connect(mapState)(App)
