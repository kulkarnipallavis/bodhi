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
            underlineFocusStyle={styles.underlineFocusStyle}/>
          <br/>
            <TextField
              id="tag"
              floatingLabelText="Tag"
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              value={this.state.tag}
              onChange={this.handleChangeTag}
              underlineFocusStyle={styles.underlineFocusStyle}/>
          <br/>
          <TextField
            id="description"
            floatingLabelText="Description"
            hintText="Description"
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            value={this.state.description}
            multiLine={true}
            onChange={this.handleChangeDesc}
            underlineFocusStyle={styles.underlineFocusStyle}/>
          <br />
        </form>
        <RaisedButton
          className="form-button"
          labelColor="white"
          backgroundColor={ blueGrey500 }
          label="Submit Request"
          onClick={this.handleSubmit}/>
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
