import React, {Component} from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Link, browserHistory } from 'react-router'
import { getMarkers, getUserLocation } from '../reducers/map'
import { updateUser } from '../reducers/auth'

class EditableProfile extends Component {

  constructor(props){
    super(props)

    this.state = Object.assign({}, this.props.currentUser)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getMarkers();
  }

  componentWillReceiveProps(newProps, oldProps){
    if (newProps.currentUser) this.setState(newProps.currentUser)
  }

  handleChange = field => event => {
    const value = event.target.value
    this.setState({
      [field]: value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    this.props.updateUser(this.state)
    browserHistory.push('/profile')
  }

  render () {
    const user = this.props.currentUser

    const styles = {
      floatingLabelFocusStyle: { color: 'white' },
      underlineFocusStyle: { borderColor: 'white' },
      inputStyle: { color: 'white' },
      errorStyle: { color: '#F0B259' }
    }

    return (
      <div className="profile gradient flex-container">
        { user ?
          <div>
            <div className="flex-row">
              <h1>Edit Profile</h1>
            </div>
            <div className="flex-row">
              <form style={{padding: '25px 0px 0px 0px'}}>
                <br/>
                <h2>Name:</h2>
                  <TextField
                  id="name"
                  hintText={user.name}
                  inputStyle={styles.inputStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  underlineFocusStyle={styles.underlineFocusStyle}
                  onChange={this.handleChange('name')}/>
                  <br/>
                <h2>Email:</h2>
                  <TextField
                    id="email"
                    hintText = {`${user.email}`}
                    inputStyle={styles.inputStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    underlineFocusStyle={styles.underlineFocusStyle}
                    onChange={(event) => this.handleChange(event, 'email')}/>
                  <br/>
                <h2>Phone Number:</h2>
                  <TextField
                    id="phone"
                    hintText = { user.phone ? user.phone : 'Please enter cell number'}
                    inputStyle={styles.inputStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    underlineFocusStyle={styles.underlineFocusStyle}
                    onChange={(event) => this.handleChange(event, 'phone')}/>
                  <br/>
                <h2>Bio:</h2>
                  <TextField
                    id="bio"
                    multiLine={true}
                    hintText = { user.bio ? user.bio : 'Tell us about yourself'}
                    textareaStyle={styles.inputStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    underlineFocusStyle={styles.underlineFocusStyle}
                    onChange={(event) => this.handleChange(event, 'bio')}
                    errorText={this.state.phone.length < 9 ? 'Please enter a 9 digit number' : ''}
                    errorStyle={styles.errorStyle}/>
                  <br/>
              </form>
            </div>
            <div className="flex-row">
              <RaisedButton
                className="form-button"
                label="Submit Changes"
                backgroundColor="white"
                type="submit"
                onClick={this.handleSubmit}/>
            </div>
          </div>
          :
          <div className="flex-row">
            <Link to="/loginenter"><u><p>Please sign in</p></u></Link>
          </div>
       }
      </div>
    )
  }
}

const mapStateToProps = state => ({ currentUser: state.currentUser, markers: state.map.markers })
const mapDispatchToProps = { getMarkers, getUserLocation, updateUser }

export default connect(mapStateToProps, mapDispatchToProps)(EditableProfile)
