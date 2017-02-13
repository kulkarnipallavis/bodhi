import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Grid, Row, Col } from 'react-bootstrap'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import { addToNetwork, sendNetworkRequest } from '../reducers/auth'

import InvitePage from './Invite'

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
		sendNetworkRequestDispatch : (friendEmail, currentUser, msg, network) => {
			dispatch(sendNetworkRequest(friendEmail, currentUser, msg, network))
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
				emailIsValid: true,
				message: 'Please add me to your network.',
				messageIsValid: true
			}
			this.handleChange = this.handleChange.bind(this)
			this.handleSubmit = this.handleSubmit.bind(this)
			this.validateEmail = this.validateEmail.bind(this)
			this.clearEmail = this.clearEmail.bind(this)
			this.handleDisable = this.handleDisable.bind(this)
		}

		handleSubmit(evt){
			evt.preventDefault()
			this.props.sendNetworkRequestDispatch(this.state.email, this.props.currentUser, this.state.message, true)
			this.clearEmail()
		}


		handleChange = (type) => (evt) => {
			const {value} = evt.target
			if(type === 'email'){
				const validEmail = this.validateEmail(value)
				this.setState({
					[type]: value,
					[`${type}IsValid`]: validEmail
				})
			}else{
				this.setState({
					[type]: value,
					[`${type}IsValid`]: !!value
				})
			}
			this.handleDisable()
		}

		handleDisable(){
			if(this.state.email && this.state.message){
				this.setState({
					disabled: false
				})
			}
			else{
				this.setState({
					disabled: true
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
				emailIsValid: true,
				messageIsValid: true
			})
		}


		render(){

			const styles = {
			    floatingLabelFocusStyle: { color: '#FFFFFF' },
			    underlineFocusStyle: { borderColor: '#FFFFFF' },
			    inputStyle: { color: '#FFFFFF' },
		      	errorStyle: { color: '#FC2A34' },
		      	row: {marginTop: '25px'},
		      	font: {'color': '#FFF'}

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
			              	<h4 style={styles.font}>Add a Connection</h4>
			            </div>
			            <div className="flex-row">
			              	<TextField
				                id="email"
				                type="email"
				                value={this.state.email}
				              	floatingLabelText="Email"
				              	floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
				              	inputStyle={styles.inputStyle}
				              	onChange={this.handleChange('email')}
				              	underlineFocusStyle={styles.underlineFocusStyle}
				              	errorText={this.state.emailIsValid ? '' : 'Please enter a valid email(e.g. email@gmail.com).'}
				              	errorStyle={styles.errorStyle} />
				        </div>
				        <br />
				        <div className="flex-row">
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

			            <div className = "flex-row" style={styles.row}>
			            	<InvitePage />
			            	<br />
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
				                      	<Link to={`/profile/${connection.uid}`}>
			                            <p className="p-color-white italic">
			                              {connection.name}
			                            </p>
				                        </Link>
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
