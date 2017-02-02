import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import { submitOffer } from '../reducers/offers'
import { updateRequestStatus } from '../reducers/requests'

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

      const styles = {
        floatingLabelFocusStyle: { color: 'white' },
        underlineFocusStyle: { borderColor: 'white' },
        inputText: { color: 'white' },
        errorStyle: { color: '#F0B259' }
      }

      return (
        <div className="gradient-body flex-container">
          <div className="flex-row">
            <h1>Offer Help</h1>
          </div>
          <div className="flex-row">
            <form onSubmit={this.handleSubmit}>
              <DatePicker
                name="date"
                inputStyle={styles.inputText}
                floatingLabelFocusStyle={styles.floatingLabelTextFocusStyle}
                floatingLabelText="Select a date"
                value={this.state.date || {}}
                onChange={(event, date) => this.handleChange(event, date, 'date')}
                locale="en-US"
                errorText={this.state.validationStateDate ? '' : 'Please select a date.'}
                errorStyle={styles.errorStyle}/>
              <br/>
              <TextField
                name="msg"
                textareaStyle={styles.inputText}
                value={this.state.message}
                onChange={(event) => this.handleChange(event, null, 'message')}
                multiLine={true}
                hintText="Message To Requester"
                floatingLabelText="Message To Requester"
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
                errorText={this.state.validationStateMessage ? '' : 'Please enter a message.'}
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
              disabled={this.state.disabled}/>
          </div>
        </div>
      )
    }
  }
)
