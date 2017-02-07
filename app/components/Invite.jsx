import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


export class InvitePage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			emails : ""
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		const emails = event.target.value
		this.setState({
			emails: emails
		})
	}

	handleSubmit(e) {
		let emails = this.state.emails
 		let emailsString = emails.split(", ").join(",")
		let a = document.createElement('a')
		a.href = "mailto:" + emailsString + "?subject=Join Bodhi&body=Body goes here!!!";
		a.click()
	}

	render() {
		const user = this.props.currentUser
		const styles = {
      floatingLabelFocusStyle: { color: '#FFFFFF' },
      underlineFocusStyle: { borderColor: '#FFFFFF' },
      backgroundColor: "white",
      width: "40vw",
      errorStyle: { color: '#F0B259' }
  	}

		return (
			<div className="profile gradient flex-container">
			{user ?
				<div className="flex-col">
				<h1>Invite Friends to Bodhi!</h1>
				<form onSubmit={this.handleSubmit}>
					<TextField
					onChange={this.handleChange}
					style={styles}
					multiLine={true}
					rows={1}
					rowsMax={10}
					id="email"
					hintText={'Enter up to 10 emails here'}
					/>
					<div className="flex-row">
						<RaisedButton
						  onClick={this.handleSubmit}
						  className="form-button"
						  label="Submit"
						  backgroundColor="white"
						 />
					</div>
				</form>
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
