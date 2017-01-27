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
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(evt) {
      evt.preventDefault();
      this.props.submitOfferDispatch(evt.target.date.value, evt.target.msg.value)
    }

    render() {

      return (
        <div>
          <h1>Offer Help</h1>
          <form onSubmit={this.handleSubmit}>
            <DatePicker
              name="date"
              floatingLabelText="Choose a date"
              locale="en-US"
              style={{ primary1Color: tealA700, pickerHeaderColor: tealA700 }} />
            <br/>
            <TextField
              name="msg"
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
