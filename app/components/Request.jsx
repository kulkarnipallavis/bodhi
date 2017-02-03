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
      //uid: this.props.uid,
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
    const {value} = event.target
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
    this.setState({popup: !this.state.popup})
  }

  isInvalid() {
    if (!this.state) return false
    const {titleIsValid, tagIsValid, descriptionIsValid} = this.state
    return !(titleIsValid && tagIsValid && descriptionIsValid)
  }

  redirect() {
    browserHistory.push('/map')
  }


  render() {
    const styles = {
      floatingLabelFocusStyle: { color: tealA700 },
      underlineFocusStyle: { borderColor: tealA700 }
    }

    return (
      <div>
        <h1>Request Help</h1>
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
          <RaisedButton
            className="form-button"
            labelColor="white"
            backgroundColor={ blueGrey500 }
            label="Submit Request"
            onClick={this.handleSubmit}
            disabled={this.isInvalid()}/>

        </form>

        <div>
          <Dialog
            title="Your Help Request has been submitted!"
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

