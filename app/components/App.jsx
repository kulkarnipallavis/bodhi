import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { theme } from '../theme'
import Navbar from './utilities/Navbar'
import MapContainer from './MapContainer'
import LB from './LB'

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

            <MapContainer />
            {//this.props.showLB &&
            }
            {
                <div id="lightbox" className="modal" >
                      <div className="modal-box">

                        {
                          this.props.children && React.cloneElement(this.props.children, this.props)
                        }

                      </div>
                </div>
            }
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = { children: PropTypes.node }
App.childContextTypes = { muiTheme: PropTypes.object }

const mapState = (state, ownProps) => ({
  children: ownProps.children,
  showLB: state.showLB
})

export default connect(mapState)(App)
