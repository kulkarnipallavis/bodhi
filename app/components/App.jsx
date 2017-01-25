import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import MUIThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Theme from '../theme'
import Navbar from '.utilities/Navbar'

const App = (props) => (
  <MUIThemeProvider muitheme={Theme}>
    <Navbar />
    { props.children && React.cloneElement(props.children, props) }
  </MUIThemeProvider>
)

App.propTypes = {
  children: PropTypes.node.isRequired
}

const mapState = (state) => ({

})

const mapDispatch = (dispatch) => ({

})

export default connect(mapState, mapDispatch)(App)
