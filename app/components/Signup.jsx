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
      emailIsValid: false,
      passwordIsValid: false
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
    const styles = {
      floatingLabelFocusStyle: { color: 'white' },
      underlineFocusStyle: { borderColor: 'white' },
      inputStyle: { color: 'white' }
    }

    return (
      <div id="signup" className="gradient flex-container">
        <div className="flex-row">
          <h1>Sign Up</h1>
        </div>
        <div className="flex-row">
          <form>
            <TextField
              id="email"
              type="email"
              inputStyle={styles.inputStyle}
              floatingLabelText="Email"
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              value={this.state.email}
              underlineFocusStyle={styles.underlineFocusStyle}
              onChange={this.handleChange('email')}
              errorText={this.state.errmsgEmail}/>
              <br />
            <TextField
              id="password"
              type="password"
              inputStyle={styles.inputStyle}
              floatingLabelText="Password"
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              value={this.state.password}
              underlineFocusStyle={styles.underlineFocusStyle}
              onChange={this.handleChange('password')}
              errorText={this.state.errmsgPassword}/>
              <br />
          </form>
        </div>
        <div className="flex-row">
          <RaisedButton
           onClick={this.handleSubmit}
           className="form-button"
           type="submit"
           labelColor="#533BD7"
           backgroundColor="white"
           label="Submit"
           disabled={this.isInvalid()} />
        </div>
      </div>
  )}
})
