import React, { Component } from 'react'
import { connect } from 'react-redux'
import TimeRangePicker from './components/utilities/TimeRange'
import DatePicker from 'material-ui/DatePicker'
import TextField from 'material-ui/TextField'
import ChipInput from 'material-ui-chip-input'

class Request extends Component {

  constructor(props) {
    super(props)

    this.state = {
      title: '',
      description: '',
    }
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeDesc = this.handleChangeDesc.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeTitle(event) {
    this.setState({title: event.target.value})
  }

  handleChangeDesc(event) {
    this.setState({description: event.target.value})
  }

  handleSubmit

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

const mapState = (state) => ({})

export default connect(mapState)(Request)
