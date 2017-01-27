import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import firebase from '../firebase.jsx'
import firebaseui from 'firebaseui'
import {connect} from 'react-redux'


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})



export default connect(mapStateToProps, mapDispatchToProps)(class Auth extends React.Component {

constructor(props) {
  super(props)
  this.state = {
    name: "",
    email: "",
    password: ""
  }

  this.handleChangeName = this.handleChangeName.bind(this)
  this.handleChangeEmail = this.handleChangeEmail.bind(this)
  this.handleChangePassword = this.handleChangePassword.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
}

// ComponentWillMount() {
//   var provider = new firebase.auth.GoogleAuthProvider()
//   firebase.auth().signInWithRedirect(provider)
// }

handleChangeName(e) {
  this.setState({ name: e.target.value })
}

handleChangeEmail(e) {
  this.setState({ email: e.target.value })
}

handleChangePassword(e) {
  this.setState({ password: e.target.value })
}

handleSubmit(e) {
  e.preventDefault()
  console.log("handleSubmit!")
  console.log('this.state ', this.state)
  firebase.auth().createUserWithEmailandPassword(this.state.email, this.state.password)
  .then(user => console.log(user))
  .catch( err => {
    console.log('error code: ', err.code)
    console.log('error msg: ', err.message)
  } )
  console.log(firebase.auth)
  //if new account is created, user is signed in automatically
}

render () {
  return (
    <div id="div_signup">

      <form onSubmit={this.handleSubmit}>
        <TextField
          id="name"
          type="text"
          floatingLabelText="Name"
          value={this.state.name}
          onChange={this.handleChangeName}
          />
          <br />
        <TextField
          id="email"
          type="email"
          floatingLabelText="Email"
          value={this.state.email}
          onChange={this.handleChangeEmail}
          />
          <br />
        <TextField
          id="password"
          type="password"
          floatingLabelText="Password"
          value={this.state.password}
          onChange={this.handleChangePassword}
          />
          <br />
        <div id="div_btn">
        <RaisedButton
          type="reset"
          labelColor="white"
          backgroundColor="#607D8B"
          label="Reset"
          />
          &nbsp;
         <RaisedButton
          type="submit"
          labelColor="white"
          backgroundColor="#607D8B"
          label="Submit"
          />
        </div>
      </form>
    </div>
  )}

})
