import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import { addToNetwork, sendNetworkRequest } from '../reducers/auth'

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addToNetworkDispatch : (email, userId) => {
			dispatch(addToNetwork(email, userId))
		},
		sendNetworkRequestDispatch : (friendEmail, currentUser, msg) => {
			dispatch(sendNetworkRequest(friendEmail, currentUser, msg))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(

	class Network extends Component{

		constructor(){
			super()
			this.state = {
				email: '',
				disabled: true,
				isEmailValid: true,
				message: 'Please add me to your network.',
				messageIsValid: true
			}
			this.handleChange = this.handleChange.bind(this)
			this.handleSubmit = this.handleSubmit.bind(this)
			this.validateEmail = this.validateEmail.bind(this)
			this.clearEmail = this.clearEmail.bind(this)
			this.handleChangeMessage = this.handleChangeMessage.bind(this)
		}

		handleSubmit(evt){
			evt.preventDefault()
			this.props.sendNetworkRequestDispatch(this.state.email, this.props.currentUser, this.state.message)
			this.clearEmail()
		}

		handleChange(evt){
			evt.preventDefault()
			const email = evt.target.value
			const validEmail = this.validateEmail(email)
			if(email && validEmail && this.state.message){
				this.setState({
					disabled: false,
					email,
					isEmailValid: validEmail
				})
			}else{
				this.setState({
					disabled: true,
					email,
					isEmailValid: validEmail
				})
			}

		}

		validateEmail(email){
			const pattern = /\S+@\S+\.\S+/
			return pattern.test(email)
		}

		clearEmail(){
			this.setState({
				email: '',
				disabled: true,
				isEmailValid: true
			})
		}

		handleChangeMessage(evt){
			const message = evt.target.value
			const validEmail = this.validateEmail(this.state.email)
			if(email && validEmail && message){
				this.setState({
					message,
					messageIsValid: true
				})
			}else{
				this.setState({
					message,
					messageIsValid: false
				})
			}

		}

		render(){

			const styles = {
			    floatingLabelFocusStyle: { color: '#FFFFFF' },
			    underlineFocusStyle: { borderColor: '#FFFFFF' },
			    inputStyle: { color: '#FFFFFF' },
		      	errorStyle: { color: '#FC2A34' },
		    }

			const currentUser = this.props.currentUser
			const connectionsObj = currentUser ? this.props.currentUser.network : {}

			const consKeys = connectionsObj ? Object.keys(connectionsObj) : []
			let connections = []
			for(let key in connectionsObj){
				connections.push(connectionsObj[key])
			}

			return(
				<Grid className="gradient" fluid>
	          		<div className="flex-container-feed">
	            		<div className="flex-row">
			              	<h2 className="feed-header">Add a Connection</h2>
			            </div>
			            <div className="flex-row">
			              	<TextField
				                id="email"
				                type="email"
				                value={this.state.email}
				              	floatingLabelText="Email"
				              	floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
				              	inputStyle={styles.inputStyle}
				              	onChange={this.handleChange}
				              	underlineFocusStyle={styles.underlineFocusStyle}
				              	errorText={this.state.isEmailValid ? '' : 'Please enter a valid email(e.g. email@gmail.com).'}
				              	errorStyle={styles.errorStyle} />
				        </div>
				        <br />
				        <div className="flex-row">
				            <TextField
				                id="msg"
				                type="msg"
				                textareaStyle={styles.inputStyle}
				                value={this.state.message}
				                onChange={this.handleChangeMessage}
				                multiLine={true}
				                hintText="Message To Friend"
				                floatingLabelText="Message To Friend"
				                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
				                underlineFocusStyle={styles.underlineFocusStyle}
				                errorText={this.state.messageIsValid ? '' : 'Please enter a message.'}
				                errorStyle={styles.errorStyle}/>

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
		              		<h1 className="feed-header">My Connections</h1>
		            	</div>
		            	<Divider/>
		            	{
		            		connections && connections.map((connection, index) =>(
		            			<div key={index}>
				                    <Row className="feed-story">
				                      <Col xs={4} sm={4} md={4} lg={4}>
				                        <Avatar className="feed-avatar" size={30} src={connection.picture}/>
				                      </Col>
				                      <Col xs={8} sm={8} md={8} lg={8}>
				                      	<u className="u-color-white">
				                            <p className="p-color-white">
				                              {connection.name}
				                            </p>
				                          </u>
				                      </Col>
				                	</Row>
                    				<Divider/>
                  				</div>
		            		))
		            	}
		            </div>
		        </Grid>
	       )
		}
	}
)
