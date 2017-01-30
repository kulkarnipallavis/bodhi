import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import { addRequest } from '../reducers/request-actions.jsx'
import RaisedButton from 'material-ui/RaisedButton'
import { tealA700, blueGrey500 } from 'material-ui/styles/colors'


/* 
Here you have just one component for Request, but for Map you had container / component architecture.
Try to keep the same architecture throughout your application. It'll give you a better sense
of where things are!
*/

class Request extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userKey: '',
      title: '',
      description: '',
      tag: '',
      location: {},
      disabled: true,
      validationStateTitle : true,
      validationStateTag : true,
      validationStateDescription : true
    }

    this.clearForm = this.clearForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.grabUserLocation = this.grabUserLocation.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, type) {
      // form validation
    if (type === 'title') {
      const title = event.target.value
      if (!title) this.setState({ title, validationStateTitle: false, disabled: true })
      else {
        this.setState({ title, validationStateTitle: true })
        
      }
    } 
    else if(type === 'tag'){
      const tag = event.target.value
      if (!tag) this.setState({ tag, validationStateTag: false, disabled: true })
      else {
        this.setState({ tag, validationStateTag: true })
      }
    }
    else {
      const description = event.target.value
      if (!description) this.setState({ description, validationStateDescription: false, disabled: true })
      else {
        this.setState({ description, validationStateDescription: true })
        // submit enabled only if both inputs are valid
        if (this.state.title && this.state.tag) this.setState({ disabled: false })
      }
    }
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
      uid: '',
      title: '',
      description: '',
      tag: '',
      location: {}
    })
  }

  handleSubmit(event){
    event.preventDefault()
    const newRequest = this.state
    this.clearForm()
    this.props.handleSubmitRequest(newRequest)
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
            onChange={(event, type) => this.handleChange(event, 'title')}
            underlineFocusStyle={styles.underlineFocusStyle}
            errorText={this.state.validationStateTitle ? '' : 'Please enter a title.'}/>
          <br/>
            <TextField
              id="tag"
              floatingLabelText="Tag"
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              value={this.state.tag}
              onChange={(event, type) => this.handleChange(event, 'tag')}
              underlineFocusStyle={styles.underlineFocusStyle}
              errorText={this.state.validationStateTag ? '' : 'Please enter a tag.'}/>
          <br/>
          <TextField
            id="description"
            floatingLabelText="Description"
            hintText="Description"
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            value={this.state.description}
            multiLine={true}
            onChange={(event, type) => this.handleChange(event,'description')}
            underlineFocusStyle={styles.underlineFocusStyle}
            errorText={this.state.validationStateDescription ? '' : 'Please enter a description.'}/>
          <br />
        </form>
        <RaisedButton
          className="form-button"
          labelColor="white"
          backgroundColor={ blueGrey500 }
          label="Submit Request"
          onClick={this.handleSubmit}
          disabled={this.state.disabled}/>
      </div>
    )
  }
}

Request.propTypes = {
  handleSubmitRequest: PropTypes.func.isRequired
}

const mapDispatch = (dispatch) => ({
  handleSubmitRequest: (request) => dispatch(addRequest(request))
})

export default connect(state => ({}), mapDispatch)(Request)
