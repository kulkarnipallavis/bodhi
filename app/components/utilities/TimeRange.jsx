import React from 'react';
import TimePicker from 'material-ui/TimePicker';

export default class TimeRangePicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      earliestTime: null,
      latestTime: null
    }
  }

  handleChangeTimePickerEarliest(event, date) {
    this.setState({earliestTime: date})
  }

  handleChangeTimeLatest(event, date) {
    this.setState({lastestTime: date})
  }

  render() {
    return (
      <div>
        <TimePicker
          format="ampm"
          hintText="Earliest"
          value={this.state.earliestTime}
          onChange={this.handleChangeTimePickerEarliest}/>
        <TimePicker
          format="ampm"
          hintText="Latest"
          value={this.state.lastestTime}
          onChange={this.handleChangeTimePickerLatest}/>
      </div>
    );
  }
}
