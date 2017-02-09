import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'

const mapStateToProps = (state) => {
	return {

	}
}

export default connect(mapStateToProps, null)(

	class Network extends Component{

		constructor(){
			super()
			this.state = {
				email: '',
				disabled: true,
				isEmailValid: true
			}
			this.handleChange = this.handleChange.bind(this)
			this.handleSubmit = this.handleSubmit.bind(this)
			this.validateEmail = this.validateEmail.bind(this)
		}

		handleSubmit(evt){
			evt.preventDefault()
			console.log(evt.target.email.value)
			
		}

		handleChange(evt){
			const email = evt.target.value
			console.log("email", email)
			const validEmail = this.validateEmail(email)
			if(email){
				this.setState({
					disabled: false,
					email: evt.target.value,
					isEmailValid: validEmail
				})
			}else{
				this.setState({
					disabled: true,
					email: evt.target.value,
					isEmailValid: validEmail
				})
			}
			
		}

		validateEmail(email){
			const pattern = /\S+@\S+\.\S+/
			return pattern.test(email)
		}

		render(){

			const styles = {
			    floatingLabelFocusStyle: { color: '#FFFFFF' },
			    underlineFocusStyle: { borderColor: '#FFFFFF' },
			    inputStyle: { color: '#FFFFFF' },
		        errorStyle: { color: '#F0B259' }
		    }

			const dummyConnections = []
			return(
				<Grid className="gradient" fluid>
	          		<div className="flex-container-feed">
	            		<div className="flex-row">
			              <h2 className="feed-header">Add a connection</h2>
			              </div>
			              <div className="flex-row">
			              	<TextField
				                id="email"
				                type="email"
				              	floatingLabelText="Email"
				              	floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
				              	inputStyle={styles.inputStyle}
				              	onChange={this.handleChange}
				              	underlineFocusStyle={styles.underlineFocusStyle}
				              	errorText={this.state.isEmailValid ? '' : 'Please enter a valid email(e.g. email@gmail.com).'}
				              	errorStyle={styles.errorStyle} />

				            <RaisedButton
					           	onClick={this.handleSubmit}
					           	className="form-button"
					           	type="submit"
					           	labelColor="#533BD7"
					           	backgroundColor="white"
					           	label="Connect"
					           	disabled={this.state.disabled} />

				              <br/>
			             
			            </div>
		            	<div className="flex-row">
		              		<h1 className="feed-header">All Connections</h1>
		            	</div>
		            	<Divider/>
		            </div>
		        </Grid>
	       )
		}
	}
)