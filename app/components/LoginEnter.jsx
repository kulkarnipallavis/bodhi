import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import { red700, blueGrey500 } from 'material-ui/styles/colors'
import { auth } from '../firebase.jsx'
import { connect } from 'react-redux'

export default connect(state => ({ currentUser: state.currentUser }))(class LoginEnter extends Component {

  constructor(props) {
    super(props)
    this.handleClickGmail = this.handleClickGmail.bind(this)
  }

  handleClickGmail() {
    var provider = new auth.GoogleAuthProvider()
    auth().signInWithRedirect(provider)
  }

  render() {
    return (
      <div id="login_options" className="flex-container">
        <div className="flex-row">
          <Link to="/login">
            <RaisedButton
              className="form-button"
              labelColor="white"
              backgroundColor={ blueGrey500 }
              label="Log in with Email"
              onClick={this.handleSubmit}/>
          </Link>
        </div>
        <div className="flex-row">
          <RaisedButton
            href="#"
            className="form-button"
            labelColor="white"
            backgroundColor={ red700 }
            label="Log in with Google"
            onClick={this.handleClickGmail}/>
        </div>
      </div>
    )}
  }
)
