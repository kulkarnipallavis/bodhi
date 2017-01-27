import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import firebase, {auth} from '../firebase.jsx'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})



export default connect(mapStateToProps, mapDispatchToProps)(class Signup extends React.Component {

constructor(props) {
  super(props)
  this.state = {
    name: "",
    email: "",
    password: "",
    errmsgEmail: "",
    errmsgPassword: "",
    //submitDisabled: true
  }

  // this.handleChangeName = this.handleChangeName.bind(this)
  this.handleChangeEmail = this.handleChangeEmail.bind(this)
  this.handleChangePassword = this.handleChangePassword.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
 // this.handleSubmitDisabled = this.handleSubmitDisabled.bind(this)
}

// ComponentWillMount() {
//   var provider = new firebase.auth.GoogleAuthProvider()
//   firebase.auth().signInWithRedirect(provider)
// }

// handleChangeName(e) {
//   this.setState({ name: e.target.value })
// }

handleChangeEmail(e) {
  this.setState({ email: e.target.value })
  console.log('email ', this.state.email)
}

handleChangePassword(e) {
  this.setState({ password: e.target.value })
  console.log('password ', this.state)
}

// handleSubmitDisabled() {
//   if (this.state.email && this.state.password) {
//     this.setState({ submitDisabled: false })
//   } else {
//     this.setState({ submitDisabled: true })
//   }
// }

handleSubmit(e) {
  e.preventDefault()
  auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
  .then(user => console.log(user))
  .then(() =>  browserHistory.push('/#/account'))
  .catch( err => {
    if (err.code === "auth/email-already-in-use" || err.code === "auth/invalid-email") {
      this.setState({ errmsgEmail: err.message })
    } else if (err.code === "auth/weak-password") {
      this.setState({ errmsgPassword: err.message })
    }
    console.log('error code: ', err.code)
    console.log('error msg: ', err.message)
  } )
  //if new account is created, user is signed in automatically
}

render () {
  return (
    <div id="div_signup">
    Sign Up

      <form onSubmit={this.handleSubmit}>
      {
        // <TextField
        //   id="name"
        //   type="text"
        //   floatingLabelText="Name"
        //   value={this.state.name}
        //   onChange={this.handleChangeName}
        //   />
        //   <br />
      }
        <TextField
          id="email"
          type="email"
          floatingLabelText="Email"
          value={this.state.email}
          onChange={this.handleChangeEmail}
          errorText={this.state.errmsgEmail}
          />
          <br />
        <TextField
          id="password"
          type="password"
          floatingLabelText="Password"
          value={this.state.password}
          onChange={this.handleChangePassword}
          errorText={this.state.errmsgPassword}
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
          //disabled={this.state.submitDisabled}
          />
        </div>
      </form>
    </div>
  )}

})
