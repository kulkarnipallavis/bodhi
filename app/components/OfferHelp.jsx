import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import { tealA700, blueGrey500 } from 'material-ui/styles/colors'
import { submitOffer } from '../reducers/offer-help'

const mapDispatchToProps = (dispatch) => {
	return {
		submitOfferDispatch: (offer) => dispatch(submitOffer(offer))
	}
}

export default connect(null, mapDispatchToProps)(

  class OfferHelp extends Component {

    constructor(props) {
      super(props);
      this.state = {
        date: null,
        message: '',
        disabled: true,
        validationStateDate: true,
        validationStateMessage: true
      }

      this.handleChange = this.handleChange.bind(this)
      this.validateSubmit = this.validateSubmit.bind(this)
      this.clearForm = this.clearForm.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event, date, type) {
      // form validation
      if (type === 'message') {
        const message = event.target.value
        if (!message) this.setState({ message, validationStateMessage: false, disabled: true })
        else {
          this.setState({ message, validationStateMessage: true })
          // submit enabled only if both inputs are valid
          if (this.state.date) this.setState({ disabled: false })
        }
      } else {
        if (!date) this.setState({ date, validationStateDate: false })
        else {
          this.setState({ date, validationStateDate: true })
        }
      }
    }

    validateSubmit() {
      if (this.state.date && this.state.message) {
        this.setState({ disabled: false })
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
              onChange={(event, date) => this.handleChange(event, date, 'date')}
              locale="en-US"
              style={{ primary1Color: tealA700, pickerHeaderColor: tealA700 }}
              errorText={this.state.validationStateDate ? '' : 'Please select a date.'}/>
            <br/>
            <TextField
              name="msg"
              value={this.state.message}
              onChange={(event) => this.handleChange(event, null, 'message')}
              multiLine={true}
              hintText="Message To Requester"
              floatingLabelText="Message To Requester"
              floatingLabelFocusStyle={{ color: tealA700 }}
              underlineFocusStyle={{ borderColor: tealA700 }}
              errorText={this.state.validationStateMessage ? '' : 'Please enter a message.'}/>
            <br/>
            
            <RaisedButton
              className="form-button"
              type="submit"
              label="Offer Help"
              backgroundColor={ blueGrey500 }
              labelStyle={{color: 'white'}}
              disabled={!this.state.disabled}
              onClick={()=>window.location=`sms:+19292695307&body=${this.state.message}`}>
              </RaisedButton>            
          </form>
        </div>
      )
    }
  }
)
