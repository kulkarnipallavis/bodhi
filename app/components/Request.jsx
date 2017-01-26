import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'

// import { updateRequestData } from '../../firebase/database'

class Request extends Component {

  constructor(props) {
    super(props)

    this.state = {
      uid: '1',
      title: '',
      description: '',
      tag: '',
      location: navigator.geolocation.getCurrentPosition(Position => ({ lat: Position.coords.latitude, long: Position.coords.longitude }))
    }

    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeDesc = this.handleChangeDesc.bind(this)
    this.handleChangeTag = this.handleChangeTag.bind(this)
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
    </div>
    )
  }
}

export default connect(state => ({}))(Request)