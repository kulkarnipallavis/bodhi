import React, {Component} from 'react'
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import {submitOffer} from '../reducers/offer-help'


const mapDispatchToProps = (dispatch) => {
	return {
		submitOfferDispatch : (date, msg) => {
			console.log("date:", date);
			dispatch(submitOffer(date, msg));
		}
	}
}

const style = {
	button : {
		margin: 20
	}
}

export default connect(null, mapDispatchToProps) (
  
  class OfferHelp extends Component{

	  	constructor(){
	  		super();
	  		this.handleSubmit = this.handleSubmit.bind(this);
	  	}

  		handleSubmit(evt){
  			evt.preventDefault();
  			this.props.submitOfferDispatch(evt.target.date.value, evt.target.msg.value)
  		}
	
		render(){
			return (
				<div>
					<form onSubmit={ this.handleSubmit }>
						<h1>Offer Help</h1>
						<DatePicker name="date" hintText="Choose a date" container="inline" />
						<br />
						<TextField name="msg" hintText="Message To Requester" floatingLabelText="Message To Requester" />
						<br />
						<RaisedButton type="submit" value="Offer Help" label="Offer Help" backgroundColor="#607D8B" style={ style.button } labelStyle={{color: 'white'}}/>
					</form>
				</div>
			)
		}
  	}
)



