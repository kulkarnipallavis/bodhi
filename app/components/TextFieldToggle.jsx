import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/FlatButton'

const TextFieldToggle = (props) => (
  <div className="flex-row" id={`edit-${props.field.toLowerCase()}`}>
    <h2>{`${props.field}:`}</h2>
    <TextField
      className="editable-profile-field"
      id={props.field.toLowerCase()}
      value={props.value}
      hintText={props.user[`${props.field.toLowerCase()}`] ?
                 props.user[`${props.field.toLowerCase()}`] :
                 `Please enter your ${props.field.toLowerCase()}`}
      inputStyle={props.styles.inputText}
      underlineFocusStyle={props.styles.underlineFocusStyle}
      onChange={props.handleChange(`${props.field.toLowerCase()}`)} />
    <br />
    <RaisedButton
      label="Save"
      className="save-edit-button"
      type={`button-save-${props.field.toLowerCase()}`}
      backgroundColor="white"
      onClick={props.handleSave(`${props.field}`)} />
  </div>
)

TextFieldToggle.propTypes = {
  field: PropTypes.string,
  value: PropTypes.string,
  user: PropTypes.object,
  styles: PropTypes.object,
  handleChange: PropTypes.func,
  handleSave: PropTypes.func
}

export default TextFieldToggle
