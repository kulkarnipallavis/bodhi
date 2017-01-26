import React, { Component, PropTypes } from 'react'
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
          <div className="container">
            { this.props.children && React.cloneElement(this.props.children, this.props) }
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}

const mapState = (state, ownProps) => {
  return {
    children: ownProps.children
  }
}

export default connect(mapState)(App)
