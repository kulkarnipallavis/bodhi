import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import { addRequest } from '../reducers/request-actions.jsx'
import RaisedButton from 'material-ui/RaisedButton'

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

    const styles = {
      errorStyle: {color: '#00BFA5'},
      floatingLabelStyle: {color: '#00BFA5'}
    }

    return (
      <form>
        <TextField
          id="title"
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText="Title"
          value={this.state.title}
          onChange={this.handleChangeTitle}
          errorStyle={styles.errorStyle}
          errorText="A request title is required."/>
        <br/>
          <TextField
            id="tag"
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelText="Tag"
            value={this.state.tag}
            onChange={this.handleChangeTag}
            errorStyle={styles.errorStyle}
            errorText="Enter a tag to categorize your request."/>
        <br/>
        <TextField
          id="description"
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText="Description"
          value={this.state.description}
          multiLine={true}
          onChange={this.handleChangeDesc}
          errorStyle={styles.errorStyle}
          errorText="Describe the help you are requesting."/>
        <br />
        <RaisedButton
          className="form-button"
          labelColor="white"
          backgroundColor="#607D8B"
          label="Submit Request"
          onClick={this.handleSubmit}/>
      </form>
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
