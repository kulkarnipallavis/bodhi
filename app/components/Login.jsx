import React from 'react'
import {browserHistory} from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import firebase, {auth} from '../firebase.jsx'

import {connect} from 'react-redux'


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})



export default connect(mapStateToProps, mapDispatchToProps)(class Login extends React.Component {

constructor(props) {
  super(props)
  this.state = {
    email: "",
    password: "",
    errmsgEmail: "",
    errmsgPassword: ""
  }

  this.handleChangeEmail = this.handleChangeEmail.bind(this)
  this.handleChangePassword = this.handleChangePassword.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
}


handleChangeEmail(e) {
  this.setState({ email: e.target.value })
}

handleChangePassword(e) {
  this.setState({ password: e.target.value })
}

handleSubmit(e) {
  e.preventDefault()
  auth().signInWithEmailAndPassword(this.state.email, this.state.password)
  .then(user =>  console.log(user))
  .then(() =>  browserHistory.push('/account'))
  .catch( err => {
    if (err.code === "auth/invalid-email" || err.code === "auth/user-disabled" || err.code === "auth/user-not-found") {
      this.setState({ errmsgEmail: err.message })
    } else if (err.code === "auth/wrong-password") {
      this.setState({ errmsgPassword: err.message })
    }
    console.log('error code: ', err.code)
    console.log('error msg: ', err.message)
  } )

}

render () {
  const styles = {
    floatingLabelFocusStyle: { color: 'white' },
    underlineFocusStyle: { borderColor: 'white' },
    inputText: {color: 'white'}
  }

  return (
    <div id="div_signup">
      <h1>Log In</h1>

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
          />
        </div>
      </form>
    </div>
  )}

})
