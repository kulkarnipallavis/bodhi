 import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { tealA700, blueGrey500 } from 'material-ui/styles/colors'
import { submitOffer } from '../reducers/offer-help'
import { updateRequestStatus } from '../reducers/request-actions'

const mapDispatchToProps = (dispatch) => {
  return {
		submitOfferDispatch: (date, msg) => dispatch(submitOffer(date, msg)),
    updateRequestStatus: (status, markerKey) => dispatch(updateRequestStatus(status, markerKey))
  }
}

const mapStateToProps = (state) => {
  return {
    selectedRequest: state.map.selectedMarker,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(

  class OfferHelp extends Component {

    constructor(props) {
      super(props);
      this.state = {
        date: null,
        message: '',
        phone: '',
        disabled: true,
        validationStateDate: true,
        validationStatePhone: true,
        validationStateMessage: true,
        popup: false
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
      } else if (type==='phone'){
        const phone = event.target.value
        if (!phone) this.setState({ phone, validationStatePhone: false, disabled: true })
        else {
          this.setState({ phone, validationStatePhone: true })
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
      if (this.state.date && this.state.message && this.state.phone) {
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
      const newOffer = {
        date: this.state.date,
        message: this.state.message,
        reqUid: this.props.selectedRequest.uid,
        reqKey: this.props.selectedRequest.key,
        offUid: this.props.currentUser.uid,
        status: 'pending'
      }

      this.clearForm()
      this.props.submitOfferDispatch(newOffer)
      this.props.updateRequestStatus('pending', this.props.selectedRequest.key)
      this.setState({popup: !this.state.popup})
    }

    redirect() {
      browserHistory.push('/')
    }

    render() {
      const request = this.props.selectedRequest

      return (
        <div>
          <h1>Offer Help</h1>

            {
            request.requester ?
            <div id="div_request">
              <h5>Request you are responding to:</h5>
                <p>user: {//<br/>request.requester.picture
                }
                {request.requester.name}</p>
                <p>message:</p>
                <h3>{request.title}</h3>
                <p>{request.description}</p>
            </div>
            :
            <div id="div_request">
              <p>Please select a request<Link to="/map"> from the map</Link> </p>
            </div>
            }


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
            <TextField
              name="phone"
              value={this.props.currentUser ? this.props.currentUser.phone : ''}
              onChange={(event) => this.handleChange(event, null, 'phone')}
              multiLine={true}
              hintText="Phone Number"
              floatingLabelText="Phone Number"
              floatingLabelFocusStyle={{ color: tealA700 }}
              underlineFocusStyle={{ borderColor: tealA700 }}
              errorText={this.state.validationStateMessage ? '' : 'Please enter your phone number.'}/>
            <br/>
            <RaisedButton
              className="form-button"
              type="submit"
              label="Offer Help"
              backgroundColor={ blueGrey500 }
              labelStyle={{color: 'white'}}
              disabled={ request.requester ? this.state.disabled: true } />
          </form>

          <div>
            <Dialog
              title="Your Help Offer has been submitted!"
              actions={[<FlatButton
                  label="OK"
                  onTouchTap={this.redirect} />]}
              modal={true}
              open={this.state.popup}
            >
            </Dialog>
          </div>

        </div>
      )
    }
  }
)
