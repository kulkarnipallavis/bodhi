import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


export class InvitePage extends Component {

	constructor(props) {
		super(props)

		this.state = {
			emails : "",
			message: "",
      emailIsValid: true,
      messageIsValid: true
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentWillReceiveProps(newProps, oldProps){
    	if (newProps.currentUser) this.setState(newProps.currentUser)
    	let defaultMessage = newProps.currentUser.name ?
      `${newProps.currentUser.name} would like you to join Bodhi! Visit bodhi-7ad02.firebaseapp.com to get started.`
      : "You've been invited to join Bodhi! Visit bodhi-7ad02.firebaseapp.com to get started."

    	this.setState({
    		message: defaultMessage
    	})
  	}

  isInvalid() {
    const { email, message, emailIsValid, messageIsValid } = this.state
    return !(email && message && emailIsValid && messageIsValid)
  }

	handleChange = type => event => {
	  let value = event.target.value
		this.setState({
			[type]: value,
      [`${type}IsValid`]: !!value
		})
	}

	handleSubmit(e) {
		let emails = this.state.emails
 		let emailsString = emails.split(", ").join(",")
		let a = document.createElement('a')
    if (this.isInvalid()) {
      a.href = "mailto:" + emailsString + "?subject=" + this.props.currentUser.name + " wants you to Join Bodhi!&body=" + this.state.message;
  		a.click()
    }
	}

	render() {
		const user = this.props.currentUser
    const styles = {
      floatingLabelFocusStyle: { color: 'white' },
      underlineFocusStyle: { borderColor: 'white' },
      inputStyle: { color: 'white' }
    }

		return (
			<div className="profile gradient flex-container">
			{ user ?
				<div>
					<div className="flex-row" style={styles.column}>
					<h1>Invite Friends to Bodhi!</h1>
					</div>
					<div className="flex-row" style={styles.column}>
            <form>
							<TextField
  							onChange={this.handleChange("emails")}
  							multiLine={true}
                textareaStyle={styles.inputStyle}
                floatingLabelText="Email(s)"
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
  							rowsMax={10}
  							id="email"
  							hintText={'Up to 10 emails, comma separated'}/>
              <br/>
  						<TextField
    						onChange={this.handleChange("message")}
    						multiLine={true}
                textareaStyle={styles.inputStyle}
                floatingLabelText="Message"
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
    						id="message"
    						defaultValue={this.state.message}/>
            </form>
					</div>
					<div className="flex-row" style={styles.column}>
						<RaisedButton
						  onClick={this.handleSubmit}
						  className="form-button"
						  label="Submit"
              labelColor="#533BD7"
						  backgroundColor="white"
              disabled={this.isInvalid()}/>
					</div>
				</div>
				:
        <div className="flex-row">
          <Link to="/loginsignup">
            <RaisedButton
              className="form-button"
              labelColor="#533BD7"
              label="Please log in or sign up"
              backgroundColor="white"/>
          </Link>
        </div> }
	    </div>
	   )
	}
}

const mapStateToProps = state => ({ currentUser: state.currentUser, markers: state.map.markers })

export default connect(mapStateToProps)(InvitePage)
