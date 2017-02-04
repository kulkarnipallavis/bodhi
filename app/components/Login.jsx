import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { auth } from '../firebase.jsx'
import { connect } from 'react-redux'

export default connect(state => ({}), dispatch => ({}))(class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errmsgEmail: '',
      errmsgPassword: ''
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
    const { email, password } = this.state
    this.clearForm()
    auth().signInWithEmailAndPassword(email, password)
    .then(() =>  browserHistory.push('/'))
    .catch( err => {
      if (err.code === 'auth/invalid-email' || err.code === 'auth/user-disabled' || err.code === 'auth/user-not-found') {
        this.setState({ errmsgEmail: err.message })
      } else if (err.code === 'auth/wrong-password') {
        this.setState({ errmsgPassword: err.message })
      }
    })
  }

  render () {
    const styles = {
          floatingLabelFocusStyle: { color: 'white' },
          underlineFocusStyle: { borderColor: 'white' },
          inputText: {color: 'white'},
          errorStyle: { color: '#F0B259' }
        }

    return (
      <div id="login" className="gradient flex-container">
        <div className="flex-row">
          <h1>Login</h1>
        </div>
        <div className="flex-row">
          <form>
            <TextField
              id="email"
              type="email"
              inputStyle={styles.inputText}
              floatingLabelText="Email"
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              value={this.state.email}
              underlineFocusStyle={styles.underlineFocusStyle}
              onChange={this.handleChange('email')}
              errorText={this.state.errmsgEmail}
              errorStyle={styles.errorStyle} />
              <br />
            <TextField
              id="password"
              type="password"
              inputStyle={styles.inputText}
              floatingLabelText="Password"
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              value={this.state.password}
              underlineFocusStyle={styles.underlineFocusStyle}
              onChange={this.handleChange('password')}
              errorText={this.state.errmsgPassword}/>
            <br/>
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
    )
  }
})
