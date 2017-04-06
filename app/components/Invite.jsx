import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  markers: state.map.markers
})

export default connect(mapStateToProps)(
  class Invite extends Component {

  	constructor(props) {
  		super(props)

  		this.state = {
  			emails: '',
  			message: 'I\'d like to invite you to join Bodhi! Visit bodhi.community to get started.',
        messageIsValid: true,
        emailsIsValid: false
  		}
  	}

    isInvalid = () => {
      const { emails, message, emailsIsValid, messageIsValid } = this.state
      return !(emails && message && emailsIsValid && messageIsValid)
    }

    clearForm = () => {
      this.setState({
        emails: '',
        message: 'I\'d like to invite you to join Bodhi! Visit bodhi.community to get started.',
        messageIsValid: true,
        emailsIsValid: false
      })
    }

  	handleChange = type => event => {
  	  let value = event.target.value
  		this.setState({
  			[type]: value,
        [`${type}IsValid`]: !!value
  		})
  	}

  	handleSubmit = event => {
      let user = this.props.currentUser
  		let emails = this.state.emails
   		let emailsString = emails.split(", ").join(",")
  		let a = document.createElement('a')
      a.href = `mailto:${emailsString}?subject=${user.name} wants you to Join Bodhi!&body="${this.state.message}`

      this.clearForm()
  		a.click()
  	}

  	render() {
      const styles = {
        floatingLabelFocusStyle: { color: 'white' },
        underlineFocusStyle: { borderColor: 'white' },
        inputStyle: { color: 'white' },
        font: {color: 'white'}
      }

  		return (
  			<div>
  				<div className="flex-row">
  				<h1 style={styles.font}>Invite Friends to Join Bodhi</h1>
  				</div>
  				<div className="flex-row">
            <form>
  						<TextField
                value={this.state.emails}
  							onChange={this.handleChange('emails')}
  							multiLine={true}
                textareaStyle={styles.inputStyle}
                floatingLabelText="Email(s)"
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
  							rowsMax={10}
  							id="email"
  							hintText={'Up to 10 emails, comma separated'}
              />
              <br/>
  						<TextField
    						onChange={this.handleChange('message')}
    						multiLine={true}
                textareaStyle={styles.inputStyle}
                floatingLabelText="Message"
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
    						id="message"
                value={this.state.message}
              />
            </form>
  				</div>
  				<div className="flex-row" style={styles.column}>
  					<RaisedButton
  					  onClick={this.handleSubmit}
  					  className="form-button"
  					  label="Submit"
              labelColor="#533BD7"
  					  backgroundColor="white"
              disabled={this.isInvalid()}
            />
  				</div>
  			</div>
  	  )
  	}
  }
)
