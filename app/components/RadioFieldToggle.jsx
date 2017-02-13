import React, { PropTypes } from 'react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'

const RadioFieldToggle = props => (
  <div className="flex-row">
    <p className="p-color-white p-no-marginLR">Profile Privacy*</p>
    <p className="p-xs-font p-color-white italic">*Phone and email are not viewable on a public profile.</p>
    <RadioButtonGroup
      className="editable-profile-field"
      onChange={props.handleChangeRadio}
      name="privacy">
      <RadioButton
        iconStyle={props.styles.radioStyle}
        labelStyle={props.styles.radioStyle}
        value="public"
        label="Everyone" />
      <RadioButton
        iconStyle={props.styles.radioStyle}
        labelStyle={props.styles.radioStyle}
        value="private"
        label="My Network" />
    </RadioButtonGroup>
    <br />
    <RaisedButton
      label="Save"
      labelColor="#533BD7"
      className="save-edit-button"
      type={`button-save-${props.field.toLowerCase()}`}
      backgroundColor="white"
      onClick={props.handleSave(`${props.field}`)} />
  </div>
)

RadioFieldToggle.propTypes = {
  field: PropTypes.string,
  value: PropTypes.string,
  user: PropTypes.object,
  styles: PropTypes.object,
  handleChangeRadio: PropTypes.func,
  handleSave: PropTypes.func
}

export default RadioFieldToggle
