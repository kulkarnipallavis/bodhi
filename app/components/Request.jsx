import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { addRequest } from '../reducers/request-actions.jsx'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import { tealA700, blueGrey500 } from 'material-ui/styles/colors'
import { browserHistory } from 'react-router'

class Request extends Component {

  constructor(props) {
    super(props)
    this.state = {
      uid: '',
      title: '',
      description: '',
      privacy: '',
      disabled: true,
      titleIsValid: true,
      tagIsValid: true,
      descriptionIsValid: true,
      privacyIsValid: true,
      popup: false
    }
  }

  handleChange = type => event => {
    const { value } = event.target
    this.setState({
      [type]: value,
      [`${type}IsValid`]: !!value,
    })
  }

  handleChangeRadio = (event, value) => {
    this.setState({
      privacy: value,
      privacyIsValid: !!value,
    })
  }

  clearForm = () => {
    this.setState({
      uid: '',
      title: '',
      description: '',
      privacy: '',
      disabled: true,
      titleIsValid: true,
      tagIsValid: true,
      descriptionIsValid: true,
      privacyIsValid: true,
      popup: false
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const newRequest = {
      uid: this.props.currentUser.uid,
      title: this.state.title,
      description: this.state.description,
      privacy: this.state.privacy,
      location: this.props.location,
      status: 'open',
    }

    this.clearForm()
    this.props.handleSubmitRequest(newRequest)
    this.setState({ popup: !this.state.popup })
  }

  isInvalid() {
    const { title, titleIsValid,
            description, descriptionIsValid,
            privacy, privacyIsValid } = this.state

    return !(title && titleIsValid &&
             description && descriptionIsValid &&
             privacy && privacyIsValid)
  }

  redirect() {
    browserHistory.push('/map')
  }


  render() {
    const styles = {
      floatingLabelFocusStyle: { color: '#FFFFFF' },
      underlineFocusStyle: { borderColor: '#FFFFFF' },
      inputStyle: { color: '#FFFFFF' },
      errorStyle: { color: '#FC2A34' },
      radioStyle: { color: '#FFFFFF', fill: '#FFFFFF' }
    }

    return (
      <div id="request-form" className="gradient flex-container">
        <div className="flex-row">
          <h1>Request Help</h1>
        </div>
        <div className="flex-row">
          <form>
            <TextField
              id="title"
              floatingLabelText="Title"
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              inputStyle={styles.inputStyle}
              value={this.state.title}
              onChange={this.handleChange('title')}
              underlineFocusStyle={styles.underlineFocusStyle}
              errorText={this.state.titleIsValid ? '' : 'Please enter a title.'}
              errorStyle={styles.errorStyle} />

            <br/>
            <TextField
              id="description"
              floatingLabelText="Description"
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              textareaStyle={styles.inputStyle}
              hintText="Description"
              value={this.state.description}
              multiLine={true}
              onChange={this.handleChange('description')}
              underlineFocusStyle={styles.underlineFocusStyle}
              errorText={this.state.descriptionIsValid ? '' : 'Please enter a description.'}
              errorStyle={styles.errorStyle} />
            <br />
            <p className="p-color-white p-no-marginLR">Who should see this request?</p>
            <RadioButtonGroup
              onChange={this.handleChangeRadio}
              name="privacy">
              <RadioButton
                iconStyle={styles.radioStyle}
                labelStyle={styles.radioStyle}
                value="public"
                label="Everyone"/>
              <RadioButton
                iconStyle={styles.radioStyle}
                labelStyle={styles.radioStyle}
                value="private"
                label="My Network Only" />
            </RadioButtonGroup>
          </form>
        </div>
        <div className="flex-row">
          <RaisedButton
            className="form-button"
            labelColor="#533BD7"
            backgroundColor="white"
            label="Submit Request"
            onClick={this.handleSubmit}
            disabled={this.isInvalid()} />
        </div>
        <div>
          <Dialog
            title="Your Help Request has been submitted!"
            actions={[<FlatButton
            label="OK"
            onTouchTap={this.redirect} />]}
            modal={true}
            open={this.state.popup} />
        </div>
      </div>
    )
  }
}

Request.propTypes = {
  handleSubmitRequest: PropTypes.func.isRequired
}

const mapState = (state) => ({
  currentUser: state.currentUser,
  location: state.map.center
})

const mapDispatch = (dispatch) => ({
  handleSubmitRequest: (request) => {
    dispatch(addRequest(request))
  }
})

export default connect(mapState, mapDispatch)(Request)
