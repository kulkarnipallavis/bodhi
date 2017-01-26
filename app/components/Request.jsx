import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import { addRequest } from '../reducers/requestReducer.jsx'
import FlatButton from 'material-ui/FlatButton'

// import { updateRequestData } from '../../firebase/database'

class Request extends Component {

  constructor(props) {
    super(props)

    this.state = {
      uid: '1',
      title: '',
      description: '',
      tag: '',
      location: {
        latitude: null,
        longitude: null
      }
    }

    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeDesc = this.handleChangeDesc.bind(this)
    this.handleChangeTag = this.handleChangeTag.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeTitle(event) {
    this.setState({title: event.target.value})
    //console.log("state", this.state)
  }

  handleChangeDesc(event) {
    this.setState({description: event.target.value})
    //console.log("state", this.state)
  }

  handleChangeTag(event) {
    this.setState({tag: event.target.value})
    //console.log("state", this.state)
  }

  handleSubmit(event){
    event.preventDefault();
    
    //console.log("location", location)
    console.log(Object.assign({}, this.state, {location}));
    //addRequest(Object.assign({location}, this.state));
  }

  componentDidMount(){
   navigator.geolocation.getCurrentPosition(Position => {
      return { latitude: Position.coords.latitude, longitude: Position.coords.longitude }
    })
   .then(location => {
    console.log("componentdidmount loc", location)
   })
    //console.log(location);
    //this.setState({location: location}) 
  }

  render() {
    var location = navigator.geolocation.getCurrentPosition(Position => {
      return { latitude: Position.coords.latitude, longitude: Position.coords.longitude }
    })
    console.log("loc in render", location);
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
        <FlatButton label="submitRequest" onClick={this.handleSubmit}/>
    </div>
    )
  }
}

export default connect(state => ({}))(Request)
