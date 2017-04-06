import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { sendNetworkRequest } from '../reducers/auth'

const mapStateToProps = state => ({currentUser: state.currentUser})

const mapDispatchToProps = dispatch => ({
  sendRequest: (friendEmail, currentUser, msg, network) => {
		dispatch(sendNetworkRequest(friendEmail, currentUser, msg, network))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(
  class AddConnection extends Component {

    constructor() {
  		super()
  		this.state = {
  			email: '',
        message: 'Please add me to your network.',
  			emailIsValid: true,
  			messageIsValid: true
  		}
  	}

    handleRequest = event => {
  		event.preventDefault()
  		this.props.sendRequest(
        this.state.email,
        this.props.currentUser,
        this.state.message,
        true
      )
  		this.clearEmail()
  	}

  	handleChange = type => evt => {
  		const { value } = evt.target
  		this.setState({
  			[type]: value,
  			[`${type}IsValid`]: type === 'email' ? this.validateEmail(value) : !!value
  		})
  	}

    isInvalid = () => {
      const { email, message, emailIsValid, messageIsValid } = this.state
      return !(email && message && emailIsValid && messageIsValid)
    }

  	validateEmail = email => {
  		const pattern = /\S+@\S+\.\S+/
  		return pattern.test(email)
  	}

  	clearEmail = () => {
  		this.setState({
  			email: '',
  			message: 'Please add me to your network.',
  			emailIsValid: true,
  			messageIsValid: true
  		})
  	}

    render() {

      const styles = {
        floatingLabelFocusStyle: { color: '#FFFFFF' },
        underlineFocusStyle: { borderColor: '#FFFFFF' },
        inputStyle: { color: '#FFFFFF' },
        errorStyle: { color: '#FC2A34' },
        font: {'color': '#FFF'}
      }

      return (
        <div id="add-connection">
          <div className="flex-row">
            <h1 style={styles.font}>Add a Connection</h1>
          </div>
          <div className="flex-row">
            <form>
              <TextField
                id="email"
                type="email"
                value={this.state.email}
                floatingLabelText="Email"
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                inputStyle={styles.inputStyle}
                onChange={this.handleChange('email')}
                underlineFocusStyle={styles.underlineFocusStyle}
                errorText={
                  !this.state.emailIsValid
                    ? 'Please enter a valid email\n(e.g. johndoe@gmail.com)'
                    : ''
                }
                errorStyle={styles.errorStyle}
              />
              <br />
              <TextField
                id="message"
                type="message"
                textareaStyle={styles.inputStyle}
                value={this.state.message}
                onChange={this.handleChange('message')}
                multiLine={true}
                hintText="Message To Friend"
                floatingLabelText="Message To Friend"
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
                errorText={this.state.messageIsValid ? '' : 'Please enter a message.'}
                errorStyle={styles.errorStyle}
              />
              <br />
            </form>
          </div>
          <div className="flex-row">
            <RaisedButton
              onClick={this.handleRequest}
              className="form-button"
              type="submit"
              labelColor="#533BD7"
              backgroundColor="white"
              label="Connect"
              disabled={this.isInvalid()}
            />
          </div>
        </div>
      )
    }
  }
)
