import React, { Component } from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import { red700, blueGrey500 } from 'material-ui/styles/colors'
import { auth } from '../firebase.jsx'

export default class LoginEnter extends Component {

  constructor() {
    super()
    this.handleClickGmail = this.handleClickGmail.bind(this)
  }

  // componentWillMount() {
  //   auth().getRedirectResult().then((result) => {
  //     if (result.credential) {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       var token = result.credential.accessToken
  //     }
  //     // The signed-in user info.
  //     var user = result.user
  //   })
  //   .catch(error => {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     // The email of the user's account used.
  //     var email = error.email;
  //     // The firebase.auth.AuthCredential type that was used.
  //     var credential = error.credential;
  //     // ...
  //   })
  // }

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
