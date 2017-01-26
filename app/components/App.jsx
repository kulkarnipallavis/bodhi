import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Theme from '../theme'
import Navbar from './utilities/Navbar'

const App = (props) => (
  <MuiThemeProvider muitheme={Theme}>
    <div>
      <Navbar />
      { props.children && React.cloneElement(props.children, props) }
    </div>
  </MuiThemeProvider>
)

App.propTypes = {
  children: PropTypes.node.isRequired
}

const mapState = (state, ownProps) => ({
  children: ownProps.children
})

export default connect(mapState)(App)
