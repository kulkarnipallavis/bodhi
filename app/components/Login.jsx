import React from 'react'
import { browserHistory } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { auth } from '../firebase.jsx'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(class Login extends React.Component {

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
    .then(() =>  browserHistory.push('/profile'))
    .catch( err => {
      if (err.code === 'auth/invalid-email' || err.code === 'auth/user-disabled' || err.code === 'auth/user-not-found') {
        this.setState({ errmsgEmail: err.message })
      } else if (err.code === 'auth/wrong-password') {
        this.setState({ errmsgPassword: err.message })
      }
    })
  }

  render () {
    return (
      <div id="login" className="flex-container">
        <div className="flex-row">
          <h1>Login</h1>
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
            <div id="div_btn">
            </div>
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
    )
  }
})
