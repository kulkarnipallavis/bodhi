import React, { PropTypes } from 'react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

const RadioField = props => (
  <div>
    <div className="flex-row privacy">
      <p className="p-color-white p-no-marginLR privacy">Profile Visible to:</p>
    </div>
    <div className="flex-row privacy">
      <RadioButtonGroup
        className="editable-profile-field privacy"
        onChange={props.handleChangeRadio}
        name="privacy"
        valueSelected={props.value}
      >
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
    </div>
  </div>
)

RadioField.propTypes = {
  value: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
  handleChangeRadio: PropTypes.func.isRequired
}

export default RadioField
