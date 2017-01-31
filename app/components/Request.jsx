import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import { addRequest } from '../reducers/request-actions.jsx'
import RaisedButton from 'material-ui/RaisedButton'
import { tealA700, blueGrey500 } from 'material-ui/styles/colors'

let geoWatchId

class Request extends Component {

  constructor(props) {
    super(props)

    this.state = {
      uid: '',
      title: '',
      description: '',
      tag: '',
      location: {},
      disabled: false,
      titleIsValid: true,
      tagIsValid: true,
      descriptionIsValid: true
    }

    this.clearForm = this.clearForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.grabUserLocation = this.grabUserLocation.bind(this)
  }

  componentDidMount() {
    this.grabUserLocation()
  }

  isInvalid() {
    const { title, tag, description, titleIsValid, tagIsValid, descriptionIsValid } = this.state
    return !(title && tag && description && titleIsValid && tagIsValid && descriptionIsValid)
  }

  handleChange = type => event => {
    const {value} = event.target
    this.setState({
      [type]: value,
      [`${type}IsValid`]: !!value,
    })
  }

  grabUserLocation() {
    geoWatchId = navigator.geolocation.getCurrentPosition(Position => {
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
    const { title, description, tag, location } = this.state
    this.clearForm()
    this.props.handleSubmitRequest({
      uid: this.props.currentUser.authUid,
      title, description, tag, location })
  }

  render() {

    const styles = {
      floatingLabelFocusStyle: { color: tealA700 },
      underlineFocusStyle: { borderColor: tealA700 }
    }
    
    return (
      <div id="request-form" className="flex-container">
        <div className="flex-row">
          <h1>Request Help</h1>
        </div>
        <div className="flex-row">
          <form style={{margin: '25px 0px 0px 0px'}}>
            <TextField
              id="title"
              floatingLabelText="Title"
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              value={this.state.title}
              onChange={this.handleChange('title')}
              underlineFocusStyle={styles.underlineFocusStyle}
              errorText={this.state.titleIsValid ? '' : 'Please enter a title.'}/>
            <br/>
              <TextField
                id="tag"
                floatingLabelText="Tag"
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                value={this.state.tag}
                onChange={this.handleChange('tag')}
                underlineFocusStyle={styles.underlineFocusStyle}
                errorText={this.state.tagIsValid ? '' : 'Please enter a tag.'}/>
            <br/>
            <TextField
              id="description"
              floatingLabelText="Description"
              hintText="Description"
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              value={this.state.description}
              multiLine={true}
              onChange={this.handleChange('description')}
              underlineFocusStyle={styles.underlineFocusStyle}
              errorText={this.state.descriptionIsValid ? '' : 'Please enter a description.'}/>
            <br />
          </form>
        </div>
        <div className="flex-row">
          <RaisedButton
            className="form-button"
            labelColor="white"
            backgroundColor={ blueGrey500 }
            label="Submit Request"
            onClick={this.handleSubmit}
            disabled={this.isInvalid()}/>
        </div>
      </div>
    )
  }
}

Request.propTypes = {
  currentUser: PropTypes.object,
  handleSubmitRequest: PropTypes.func.isRequired
}

const mapState = (state) => ({
  uid: state.currentUser.uid
})

const mapDispatch = (dispatch) => ({
  handleSubmitRequest: (request) => dispatch(addRequest(request))
})


export default connect(state => ({ currentUser: state.currentUser }), mapDispatch)(Request)

