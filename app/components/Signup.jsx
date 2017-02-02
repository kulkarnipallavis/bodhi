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
}

handleChangePassword(e) {
  this.setState({ password: e.target.value })
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
  .then(user => {
    console.log(user)
  })
  .then(() =>  browserHistory.push('/account'))
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

    const styles = {
      floatingLabelFocusStyle: { color: 'white' },
      underlineFocusStyle: { borderColor: 'white' },
      inputText: {color: 'white'}
    }

  return (
    <div id="signup" className="gradient-body flex-container-gradient">
      <h1>Sign Up</h1>
      <form onSubmit={this.handleSubmit}>
        <TextField
          id="email"
          type="email"
          inputStyle={styles.inputText}
          floatingLabelText="Email"
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          value={this.state.email}
          underlineFocusStyle={styles.underlineFocusStyle}
          onChange={this.handleChangeEmail}
          errorText={this.state.errmsgEmail}
          />
          <br />
        <TextField
          id="password"
          type="password"
          inputStyle={styles.inputText}
          floatingLabelText="Password"
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          value={this.state.password}
          underlineFocusStyle={styles.underlineFocusStyle}
          onChange={this.handleChangePassword}
          errorText={this.state.errmsgPassword}
          />
          <br /><br /><br />
        <div id="div_btn">
        <RaisedButton
          type="reset"
          labelColor="#533BD7"
          backgroundColor="white"
          label="Reset"
          />
          &nbsp;
         <RaisedButton
          type="submit"
          labelColor="#533BD7"
          backgroundColor="white"
          label="Submit"
          //disabled={this.state.submitDisabled}
          />
        </div>
      </form>
    </div>
  )}

})
