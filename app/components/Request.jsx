import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { addRequest } from '../reducers/request-actions.jsx'
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
      tag: '',
      location: {},
      disabled: true,
      titleIsValid: true,
      tagIsValid: true,
      descriptionIsValid: true,
      status: 'open',
      popup: false
    }

    this.clearForm = this.clearForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.grabUserLocation = this.grabUserLocation.bind(this)
  }

  handleChange = type => event => {
    const { value } = event.target
    this.setState({
      [type]: value,
      [`${type}IsValid`]: !!value,
    })
  }

  componentDidMount() {
    this.grabUserLocation()
  }

  grabUserLocation() {
    navigator.geolocation.watchPosition(Position => {
      this.setState({
        location: {
          latitude: Position.coords.latitude,
          longitude: Position.coords.longitude }
      })
    })
  }

  clearForm() {
    this.setState({
      title: '',
      description: '',
      tag: ''
    })
  }

  handleSubmit(event){
    event.preventDefault()
    const newRequest = {
      uid: this.props.currentUser.uid,
      title: this.state.title,
      description: this.state.description,
      tag: this.state.tag,
      location: this.state.location,
      status: this.state.status,
    }

    this.clearForm()
    this.props.handleSubmitRequest(newRequest)
    this.setState({ popup: !this.state.popup })
  }

  isInvalid() {
    if (!this.state) return false
    const { title, titleIsValid, tag, tagIsValid, description, descriptionIsValid } = this.state
    return !(title && titleIsValid && tag && tagIsValid && description && descriptionIsValid)
  }

  redirect() {
    browserHistory.push('/map')
  }


  render() {
    const styles = {
      floatingLabelFocusStyle: { color: '#FFFFFF' },
      underlineFocusStyle: { borderColor: '#FFFFFF' },
      inputStyle: { color: '#FFFFFF' },
      errorStyle: { color: '#F0B259' }
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
              errorStyle={styles.errorStyle}/>
            <br/>
            <TextField
              id="tag"
              floatingLabelText="Tag"
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              inputStyle={styles.inputStyle}
              value={this.state.tag}
              onChange={this.handleChange('tag')}
              underlineFocusStyle={styles.underlineFocusStyle}
              errorText={this.state.tagIsValid ? '' : 'Please enter a tag.'}
              errorStyle={styles.errorStyle}/>
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
              errorStyle={styles.errorStyle}/>
            <br />
          </form>
        </div>
        <div className="flex-row">
          <RaisedButton
            className="form-button"
            labelColor="#533BD7"
            backgroundColor="white"
            label="Submit Request"
            onClick={this.handleSubmit}
            disabled={this.isInvalid()}/>
        </div>
        <div>
          <Dialog
            title="Your Help Request has been submitted!"
            actions={[<FlatButton
            label="OK"
            onTouchTap={this.redirect} />]}
            modal={true}
            open={this.state.popup}/>
        </div>
      </div>
    )
  }
}

Request.propTypes = {
  handleSubmitRequest: PropTypes.func.isRequired
}

const mapState = (state) => ({
  currentUser: state.currentUser
})

const mapDispatch = (dispatch) => ({
  handleSubmitRequest: (request) => {
    dispatch(addRequest(request))
  }
})

export default connect(mapState, mapDispatch)(Request)
