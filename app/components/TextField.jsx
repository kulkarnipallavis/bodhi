import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'

const TextInputField = props => (
  <div className="flex-row" id={`edit-${props.field.toLowerCase()}`}>
    <TextField
      className="editable-profile-field"
      id={props.field.toLowerCase()}
      value={props.value}
      floatingLabelText={
        props.field === 'Phone' || props.field === 'Email'
          ? `*${props.field}:` : `${props.field}:`
      }
      floatingLabelFixed={true}
      floatingLabelStyle={props.styles.inputText}
      hintText={
        props.user[`${props.field.toLowerCase()}`]
          ? props.user[`${props.field.toLowerCase()}`]
          : `Please enter your ${props.field.toLowerCase()}`
      }
      inputStyle={props.styles.inputText}
      underlineFocusStyle={props.styles.underlineFocusStyle}
      onChange={props.handleChange(`${props.field.toLowerCase()}`)}
      multiLine={props.field === 'Bio' || false}
      textareaStyle={props.styles.inputText}
      rows={1}
      rowsMax={10}
    />
    <br />
  </div>
)

TextInputField.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default TextInputField
