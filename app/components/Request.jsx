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
      tags: [],
      description: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(tags) {

  }

  render() {
    return (
      <div>
        <TextField
          hintText="Title"
          errorText="A request title is required."/>
        <br />

        <br />
        <TextField
          hintText="Description"
          errorText="Please describe the help you are requesting."/>
        <br />
        <ChipInput
          defaultValue={[]}
          onChange={(tags) => this.handleChange(tags)}/>
    </div>
    )
  }
}

const mapState = (state) => ({})

export default connect(mapState)(Request)
