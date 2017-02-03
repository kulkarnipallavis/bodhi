import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton'
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
        date: {},
        message: '',
        disabled: true,
        dateIsValid: true,
        messageIsValid: true
      }
      this.clearForm = this.clearForm.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (type) => (event, date) => {
      let value;
      if (!date) value = event.target.value
      else value = date
      this.setState({
        [type]: value,
        [`${type}IsValid`]: !!value,
      })
    }

    isInvalid() {
      const { date, message, dateIsValid, messageIsValid } = this.state
      return !(dateIsValid && date &&  message && messageIsValid && this.props.selectedRequest.requester)
    }

    clearForm() {
      this.setState({
        date: {},
        message: '',
        disabled: true,
        dateIsValid: true,
        messageIsValid: true
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
      browserHistory.push('/')
    }

    render() {
      const request = this.props.selectedRequest
      const styles = {
        floatingLabelFocusStyle: { color: '#FFFFFF' },
        underlineFocusStyle: { borderColor: '#FFFFFF' },
        inputStyle: { color: '#FFFFFF' },
        errorStyle: { color: '#F0B259' }
      }

      return (
        <div className="gradient flex-container">
          <div className="flex-row">
            <h1>Offer Help</h1>
          </div>
          <div id="request-details" className="flex-row">
            <div className="flex-col-white">
              { request.requester ?
                 <div>
                   <div id="requester-avatar" className="flex-row">
                     <Avatar
                       size={100}
                       src={request.requester.picture}/>
                   </div>
                   <h3>{`${request.requester.name} needs help with ${request.title}.`}</h3>
                   <p>{`Description: ${request.description}`}</p>
                 </div>
                 :
                 <div id="offer-fail-safe" className="flex-row">
                   <p>Please select a request <Link to="/map"><u>from the map.</u></Link></p>
                 </div>}
            </div>
          </div>
          <div className="flex-row">
            <form onSubmit={this.handleSubmit}>
              <DatePicker
                name="date"
                inputStyle={styles.inputStyle}
                floatingLabelFocusStyle={styles.floatingLabelTextFocusStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
                floatingLabelText="Select a date"
                value={this.state.date}
                onChange={this.handleChange('date')}
                locale="en-US"
                errorText={this.state.dateIsValid ? '' : 'Please select a date.'}
                errorStyle={styles.errorStyle}/>
              <br/>
              <TextField
                name="msg"
                textareaStyle={styles.inputStyle}
                value={this.state.message}
                onChange={this.handleChange('message')}
                multiLine={true}
                hintText="Message To Requester"
                floatingLabelText="Message To Requester"
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
                errorText={this.state.messageIsValid ? '' : 'Please enter a message.'}
                errorStyle={styles.errorStyle}/>
              <br/>
            </form>
          </div>
          <div className="flex-row">
            <RaisedButton
              className="form-button"
              type="submit"
              label="Offer Help"
              backgroundColor="white"
              labelColor="#533BD7"
              disabled={this.isInvalid()}/>
          </div>
        </div>
      )
    }
  }
)
