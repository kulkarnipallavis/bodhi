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

  class OfferHelp extends Component{

    constructor() {
      super();
      this.state = {
      	date : "",
      	disabled : true,
      	errorText : ""
      }
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleChangeMessage = this.handleChangeMessage.bind(this)
      this.handleChangeDate = this.handleChangeDate.bind(this)
    }

    handleSubmit(evt) {
      evt.preventDefault();
      this.props.submitOfferDispatch(evt.target.date.value, evt.target.msg.value)
    }

    handleChangeMessage(evt){
    	console.log(this.state.date);
    	if(!evt.target.value){
    		this.setState({
    			errorText : "Please enter message.",
    			disabled : true
    		})
    	}else{
    		this.setState({
    			disabled : false
    		})
    	}
    }

    handleChangeDate(evt){
    	// console.log("date selected", evt.target.date.value);
    	// this.setState({
    	// 	date : evt.target.date.value
    	// })
    	// if(!evt.target.value){
    	// 	console.log("in if");
    	// 	this.setState({
    	// 		errorText : "Please select a date."
    	// 	})
    	// }else{
    	// 	console.log("in else");
    	// 	this.setState({
    	// 		disabled : false
    	// 	})
    	// }
    }

    render() {

      return (
        <div>
          <h1>Offer Help</h1>
          <form onSubmit={this.handleSubmit}>
            <DatePicker
              name="date"
              floatingLabelText="Select a date"
              locale="en-US"
              style={{ primary1Color: tealA700, pickerHeaderColor: tealA700 }} 
              onChange={this.handleChangeDate}
              />
            <br/>
            <TextField
              name="msg"
              multiLine={true}
              hintText="Message To Requester"
              floatingLabelText="Message To Requester"
              floatingLabelFocusStyle={{ color: tealA700 }}
              underlineFocusStyle={{ borderColor: tealA700 }} 
              onChange={this.handleChangeMessage}
              errorText={this.state.errorText}/>
            <br/>
            <RaisedButton
              className="form-button"
              type="submit"
              value="Offer Help"
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
