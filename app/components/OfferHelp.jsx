import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import Avatar from 'material-ui/Avatar'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
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
        date: {},
        message: '',
        phone: '',
        disabled: true,
        dateIsValid: true,
        messageIsValid: true,
        phoneIsValid: true,
        popup: false
      }
      this.clearForm = this.clearForm.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentDidMount(){
      this.props.currentUser.phone && this.setState({phone: this.props.currentUser.phone})
    }

    handleChange = (type) => (event, date) => {

      console.log("HANDLECHANGE STATE", this.state)

      let value;
      if (!date) value = event.target.value
      else value = date
      this.setState({
        [type]: value,
        [`${type}IsValid`]: !!value,
      })
    }

    isInvalid() {
      const { date, message, phone, dateIsValid, messageIsValid, phoneIsValid } = this.state
      return !(dateIsValid && date &&  message && messageIsValid && phone && phoneIsValid && this.props.selectedRequest.requester)
    }

    clearForm() {
      this.setState({
        date: {},
        message: '',
        phone: '',
        disabled: true,
        dateIsValid: true,
        phoneIsValid: true,
        messageIsValid: true
      })
    }

    handleSubmit(event) {
      console.log("HANDLESUBMIT STATE 1", this.state)
      event.preventDefault()
      const newOffer = {
        date: this.state.date,
        message: this.state.message,
        phone: this.state.phone,
        reqUid: this.props.selectedRequest.uid,
        reqKey: this.props.selectedRequest.key,
        offUid: this.props.currentUser.uid,
        status: 'pending'
      }

      this.clearForm()
      this.props.submitOfferDispatch(newOffer)
      this.props.updateRequestStatus('pending', this.props.selectedRequest.key)
      this.setState({popup: !this.state.popup})

      console.log("HANDLESUBMIT STATE 2", this.state)
    }

    redirect() {
      console.log("redirect")
      browserHistory.push('/')
    }

    render() {
      const request = this.props.selectedRequest
      const styles = {
        floatingLabelFocusStyle: { color: '#FFFFFF' },
        underlineFocusStyle: { borderColor: '#FFFFFF' },
        inputStyle: { color: '#000000' },
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
                   <Avatar src={request.requester.picture}/>
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
            <form>
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
              <TextField
                name="phone"
                textareaStyle={styles.inputStyle}
                value={this.state.phone}
                onChange={this.handleChange('phone')}
                hintText="Please Enter Your Phone"
                floatingLabelText="Phone Number"
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
                errorText={this.state.phoneIsValid ? '' : 'Please enter your phone number.'}
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
              onClick={this.handleSubmit}
              disabled={this.isInvalid()}/>
          </div>
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

