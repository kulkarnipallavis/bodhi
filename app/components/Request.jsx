import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import { addRequest } from '../reducers/request-actions.jsx'
import FlatButton from 'material-ui/FlatButton'

class Request extends Component {

  constructor(props) {
    super(props)

    this.state = {
      uid: '1',
      title: '',
      description: '',
      tag: '',
      location: {}
    }

    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeDesc = this.handleChangeDesc.bind(this)
    this.handleChangeTag = this.handleChangeTag.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.grabUserLocation = this.grabUserLocation.bind(this)
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

  handleChangeTitle(event) {
    this.setState({title: event.target.value})
  }

  handleChangeDesc(event) {
    this.setState({description: event.target.value})
  }

  handleChangeTag(event) {
    this.setState({tag: event.target.value})
  }

  handleSubmit(event){
    event.preventDefault()
    this.props.handleSubmitRequest(this.state)
  }

  render() {

    return (
      <div>
        <TextField
          id="title"
          hintText="Title"
          value={this.state.title}
          onChange={this.handleChangeTitle}
          errorText="A request title is required."/>
        <br/>
          <TextField
            id="tag"
            hintText="Tag"
            value={this.state.tag}
            onChange={this.handleChangeTag}
            errorText="Please enter a tag to categorize your request."/>
        <br/>
        <TextField
          id="description"
          hintText="Description"
          value={this.state.description}
          onChange={this.handleChangeDesc}
          errorText="Please describe the help you are requesting."/>
        <br />
        <FlatButton label="Submit Request" onClick={this.handleSubmit}/>
    </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  handleSubmitRequest: (request) => dispatch(addRequest(request))
})

export default connect(state => ({}), mapDispatch)(Request)
