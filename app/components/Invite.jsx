import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


export class InvitePage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			emails : "",
			message: ""
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange = field => event => {
	    const value = event.target.value
		this.setState({
			[field] : value
		})	
	}

	handleSubmit(e) {
		let emails = this.state.emails
 		let emailsString = emails.split(", ").join(",")
		let a = document.createElement('a')
		a.href = "mailto:" + emailsString + "?subject=" + this.props.currentUser.name + " wants you to Join Bodhi!&body=" + this.state.message;
		a.click()
	}

	render() {
		const user = this.props.currentUser
		const styles = {
			textField: {
		      floatingLabelFocusStyle: { color: '#FFFFFF' },
		      backgroundColor: 'white',
		      errorStyle: { color: '#F0B259' },
		      marginBottom: '10px',
		      padding: '7px'
		  	},

		  	column: {
		  		textAlign: 'center'
		  	}
    	}

		return (
			<div className="profile gradient flex-container">
			{user ?
				<div>
					<div className="flex-col" style={styles.column}>
					<h1>Invite Friends to Bodhi!</h1>
					</div>
					<div className="flex-col" style={styles.column}>
						<TextField
						onChange={(event) => this.handleChange(event, 'emails')}
						style={styles.textField}
						multiLine={true}
						rows={1}
						rowsMax={10}
						id="email"
						hintText={'Enter up to 10 emails here'}
						/>
					</div>
					<div className="flex-col" style={styles.column}>
						<TextField
						onChange={(event) => this.handleChange(event, 'message')}
						style={styles.textField}
						multiLine={true}
						rows={10}
						rowsMax={10}
						id="message"
						defaultValue={user.name ? `${user.name} would like you to join Bodhi! Visit bodhi-7ad02.firebaseapp.com to get started.` : "You've been invited to join Bodhi! Visit bodhi-7ad02.firebaseapp.com to get started."}
						/>
					</div>
					<div className="flex-col" style={styles.column}>
						<RaisedButton
						  onClick={this.handleSubmit}
						  className="form-button"
						  label="Submit"
						  backgroundColor="white"
						 />
					</div>
				</div>
				:
				<p>Please sign in.</p>
			}
	    </div>
	    )
	}
}

const mapStateToProps = state => ({ currentUser: state.currentUser, markers: state.map.markers })

export default connect(mapStateToProps)(InvitePage)
