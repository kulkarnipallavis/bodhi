import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'

const TextFieldToggle = (props) => (
  <div className="flex-row" id={`edit-${props.field.toLowerCase()}`}>
    <h2>{`${props.field}:`}</h2>
    <TextField
      className="editable-profile-field"
      id={props.field.toLowerCase()}
      value={props.value}
      hintText={
        props.user[`${props.field.toLowerCase()}`]
          ? props.user[`${props.field.toLowerCase()}`]
          : `Please enter your ${props.field.toLowerCase()}`
      }
      inputStyle={props.styles.inputText}
      underlineFocusStyle={props.styles.underlineFocusStyle}
      onChange={props.handleChange(`${props.field.toLowerCase()}`)}
    />
    <br />
  </div>
)

TextFieldToggle.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default TextFieldToggle
