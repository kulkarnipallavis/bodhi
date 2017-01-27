import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import { addRequest } from '../reducers/request-actions.jsx'
import RaisedButton from 'material-ui/RaisedButton'
import { tealA700, blueGrey500 } from 'material-ui/styles/colors'

class Request extends Component {

  constructor(props) {
    super(props)

    this.state = {
      uid: '',
      title: '',
      description: '',
      tag: '',
      location: {},
      disabled : true,
      errorTextTitle: '',
      errorTextTag: '',
      errorTextDesc: ''
    }

    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeDesc = this.handleChangeDesc.bind(this)
    this.handleChangeTag = this.handleChangeTag.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.grabUserLocation = this.grabUserLocation.bind(this)
    this.checkInputs = this.checkInputs.bind(this)
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
    const title = event.target.value
    if(!title){
      this.setState({
        errorTextTitle : "Please enter a Title.",
        title,
        disabled : true
      })
    }else{
    this.setState({
      title,
      errorTextTitle : ""
    })
    }
  }

  handleChangeDesc(event) {
    const description = event.target.value
    if(!description){
      this.setState({
        errorTextDesc : "Please enter a description.",
        description,
        disabled : true
      })
    }else{     
    this.setState({
      description,
      errorTextDesc : ""
     })
    }
    this.checkInputs()
  }

  handleChangeTag(event) {
    const tag = event.target.value
    if(!tag){
      this.setState({
        errorTextTag : "Please enter a tag.",
        tag,
        disabled : true
      })
    }else{
      this.setState({
        tag,
        errorTextTag : ""
      })
    }
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


  checkInputs(){
    if(this.state.title && this.state.tag && this.state.description){
        this.setState({
          disabled : false
        })
    }  
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
            onChange={this.handleChangeTitle}
            underlineFocusStyle={styles.underlineFocusStyle}
            errorText={this.state.errorTextTitle}/>
          <br/>
            <TextField
              id="tag"
              floatingLabelText="Tag"
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              value={this.state.tag}
              onChange={this.handleChangeTag}
              underlineFocusStyle={styles.underlineFocusStyle}
              errorText={this.state.errorTextTag}/>
          <br/>
          <TextField
            id="description"
            floatingLabelText="Description"
            hintText="Description"
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            value={this.state.description}
            multiLine={true}
            onChange={this.handleChangeDesc}
            underlineFocusStyle={styles.underlineFocusStyle}
            errorText={this.state.errorTextDesc}/>
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
