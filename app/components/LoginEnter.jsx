import React from 'react'
import {browserHistory} from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import firebase, {auth} from '../firebase.jsx'
//import firebaseui from 'firebaseui'
import {connect} from 'react-redux'
import {Link} from 'react-router'


export default class LoginEnter extends React.Component {

constructor() {
  super()
  this.handleClickGmail = this.handleClickGmail.bind(this)
}

componentWillMount() {
  auth().getRedirectResult().then((result) => {
    if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    console.log('token: ', token)
  }
  // The signed-in user info.
  var user = result.user;
  console.log('user ', user)
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

handleClickGmail() {
  var provider = new auth.GoogleAuthProvider()
  auth().signInWithRedirect(provider)
}

render() {
return(
<div id="div_login_options">
  <p><Link to='/login'>Log in with Email</Link></p>

  <br/>
  <br/>
  <p><Link onClick={this.handleClickGmail}>Log in with Gmail</Link></p>

</div>
)}

}
