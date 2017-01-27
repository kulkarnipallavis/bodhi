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
      super(props)

      this.state = {
        date: null,
        message: ''
      }
      this.handleMessage = this.handleMessage.bind(this)
      this.handleDatePick = this.handleDatePick.bind(this)
      this.clearForm = this.clearForm.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleDatePick(event, date) {
      this.setState({ date })
    }

    handleMessage(event) {
      this.setState({ message: event.target.value })
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
              value={this.state.date}
              onChange={this.handleDatePick}
              floatingLabelText="Choose a date"
              locale="en-US"
              style={{ primary1Color: tealA700, pickerHeaderColor: tealA700 }} />
            <br/>
            <TextField
              name="msg"
              value={this.state.message}
              onChange={this.handleMessage}
              multiLine={true}
              hintText="Message To Requester"
              floatingLabelText="Message To Requester"
              floatingLabelFocusStyle={{ color: tealA700 }}
              underlineFocusStyle={{ borderColor: tealA700 }} />
            <br/>
            <RaisedButton
              className="form-button"
              type="submit"
              value="Offer Help"
              label="Offer Help"
              backgroundColor={ blueGrey500 }
              labelStyle={{color: 'white'}}/>
          </form>
        </div>
      )
    }
  }
)
