import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { theme } from '../theme'
import Navbar from './utilities/Navbar'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = { muiTheme: {} }
    this.getChildContext = this.getChildContext.bind(this)
  }

  componentWillMount() {
     this.setState({ muiTheme: theme })
  }

  getChildContext() {
    return { muiTheme: theme }
  }

  render() {

    return (
      <MuiThemeProvider muitheme={getMuiTheme(theme)}>
        <div>
          <Navbar />
          { this.props.children && React.cloneElement(this.props.children, this.props) }
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = { children: PropTypes.node }
App.childContextTypes = { muiTheme: PropTypes.object }

const mapState = (state, ownProps) => ({ children: ownProps.children })

export default connect(mapState)(App)
