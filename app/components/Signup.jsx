import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { auth } from '../firebase.jsx'

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(class Signup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errmsgEmail: '',
      errmsgPassword: '',
      emailIsValid: true,
      passwordIsValid: true
    }
    this.clearForm = this.clearForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // ComponentWillMount() {
  //   var provider = new firebase.auth.GoogleAuthProvider()
  //   firebase.auth().signInWithRedirect(provider)
  // }

  isInvalid() {
    const { email, password, emailIsValid, passwordIsValid } = this.state
    return !(email && password && emailIsValid && passwordIsValid)
  }

  handleChange = type => event => {
    const { value } = event.target
    this.setState({
      [type]: value,
      [`${type}IsValid`]: !!value,
    })
  }

  clearForm() {
    this.setState({
      email: '',
      password: '',
      errmsgEmail: '',
      errmsgPassword: '',
      emailIsValid: true,
      passwordIsValid: true
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.clearForm()
    auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() =>  browserHistory.push('/profile'))
    // if new account is created, user is signed in automatically
    .catch( err => {
      if (err.code === 'auth/email-already-in-use' || err.code === 'auth/invalid-email') {
        this.setState({ errmsgEmail: err.message })
      } else if (err.code === 'auth/weak-password') {
        this.setState({ errmsgPassword: err.message })
      }
    })
  }

  render () {
    return (
      <div id="signup" className="flex-container">
        <div className="flex-row">
          <h1>Sign Up</h1>
        </div>
        <div className="flex-row">
          <form>
            <TextField
              id="email"
              type="email"
              floatingLabelText="Email"
              value={this.state.email}
              onChange={this.handleChange('email')}
              errorText={this.state.errmsgEmail} />
              <br />
            <TextField
              id="password"
              type="password"
              floatingLabelText="Password"
              value={this.state.password}
              onChange={this.handleChange('password')}
              errorText={this.state.errmsgPassword} />
              <br />
          </form>
        </div>
        <div className="flex-row">
          <RaisedButton
           onClick={this.handleSubmit}
           className="form-button"
           type="submit"
           labelColor="white"
           backgroundColor="#607D8B"
           label="Submit"
           disabled={this.isInvalid()} />
        </div>
      </div>
  )}
})
