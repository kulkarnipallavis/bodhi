import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import { tealA700, blueGrey500 } from 'material-ui/styles/colors'
import { submitOffer } from '../reducers/offer-help'

const mapDispatchToProps = (dispatch) => {
	return {
		submitOfferDispatch: (date, msg) => dispatch(submitOffer(date, msg))
	}
}

export default connect(null, mapDispatchToProps)(

  class OfferHelp extends Component {

    constructor(props) {
      super(props);
      this.state = {
      	date : {},
      	message: '',
      	disabled : true,
      	errorTextMessage : '',
      	errorTextDate : ''
      }

      this.handleMessage = this.handleMessage.bind(this)
      this.handleDatePick = this.handleDatePick.bind(this)
      this.clearForm = this.clearForm.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.checkInputs = this.checkInputs.bind(this)
    }

    handleDatePick(event, date) {
      if(!date){
	      	this.setState({
	      		errorTextDate : "Please select a date.",
	      		date,
	      		disabled : true
	      	})
      }else{
      		this.setState({
      			errorTextDate : "",
      			date
      		})
      }
    }

    handleMessage(event) {
    const message = event.target.value
      if(!message){
    		this.setState({
    			errorTextMessage : "Please enter message.",
    			message,
    			disabled : true
    		})
    	}else{
    		this.setState({
    			errorTextMessage : "",
    			message 
    		})
    	}
    	this.checkInputs()
    }

    checkInputs(){
    	if(this.state.date && this.state.message){
	        this.setState({
	          disabled : false
	        })
    	}
    }

    clearForm() {
      this.setState({
        date: null,
        message: ''
      })
    }

    handleSubmit(event) {
      event.preventDefault()
      const newOffer = this.state
      this.clearForm()
      this.props.submitOfferDispatch(newOffer)
    }

    render() {

      return (
        <div>
          <h1>Offer Help</h1>
          <form onSubmit={this.handleSubmit}>
            <DatePicker
              name="date"
              floatingLabelText="Select a date"
              value={this.state.date}
              onChange={this.handleDatePick}
              locale="en-US"
              style={{ primary1Color: tealA700, pickerHeaderColor: tealA700 }} 
              errorText={this.state.errorTextDate}/>
            <br/>
            <TextField
              name="msg"
              value={this.state.message}
              onChange={this.handleMessage}
              multiLine={true}
              hintText="Message To Requester"
              floatingLabelText="Message To Requester"
              floatingLabelFocusStyle={{ color: tealA700 }}
              underlineFocusStyle={{ borderColor: tealA700 }}
              errorText={this.state.errorTextMessage}/>
            <br/>
            <RaisedButton
              className="form-button"
              type="submit"
              label="Offer Help"
              backgroundColor={ blueGrey500 }
              labelStyle={{color: 'white'}}
              disabled={this.state.disabled}/>
          </form>
        </div>
      )
    }
  }
)
