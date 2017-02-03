import React, {Component} from 'react'
// import { auth } from '../firebase.jsx'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/FlatButton'
import { Link } from 'react-router'
import { getMarkers, getUserLocation } from '../reducers/map'
import { updateUser } from '../reducers/auth'
import { browserHistory } from 'react-router'

class EditableProfile extends Component {

  constructor(props){
    super(props);

    this.state = Object.assign({}, this.props.currentUser)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  componentDidMount() {
    this.props.getMarkers();
  }

  componentWillReceiveProps(newProps, oldProps){
    newProps.currentUser && this.setState(newProps.currentUser)
  }

  handleChange(event, field) {
    const value = event.target.value
    this.setState({
      [field]: value
    })
  }

  handleSubmit(event, id){
    event.preventDefault()
    const user = this.props.currentUser;
    console.log(this.props.currentUser)
    this.props.updateUser(this.state)
    browserHistory.push('/profile')
  }

  render () {
  const user = this.props.currentUser;
  console.log("PROPS", this.props)

  const styles = {
    floatingLabelFocusStyle: { color: 'white' },
    underlineFocusStyle: { borderColor: 'white' },
    inputText: {color: 'white'},
    buttonText: {color: '#533BD7'},
    errorStyle: { color: '#f44256' }
  }

  return (
    <div className="profile">
      {
        user ?
        <div>
        <form onSubmit={this.handleSubmit}>
          <RaisedButton label="Submit Changes" 
          primary={false} 
          style={styles.buttonText}
          type="submit" 
          onClick={this.handleSubmit}/>
          <div className="flex-row">
            <div className="flex-col">
              <Avatar src={user.picture}/>
              <p style={styles.buttonText}> Name:</p>
              <TextField
                id="name"
                defaultValue={user.name}
                inputStyle={styles.inputText}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
                onChange={(event) => this.handleChange(event, "name")}
              />
              <p style={styles.buttonText}>Email:</p>
              <TextField 
                  id="email"
                  defaultValue = {`${user.email}`}
                  inputStyle={styles.inputText}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  underlineFocusStyle={styles.underlineFocusStyle}
                  onChange={(event)=> this.handleChange(event, "email")}
              />
              <p style={styles.buttonText}>Phone Number:</p>
              <TextField 
                  id="phone"
                  defaultValue = { user.phone ? user.phone : "Write your phone number here!"}
                  inputStyle={styles.inputText}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  underlineFocusStyle={styles.underlineFocusStyle}
                  onChange={(event)=> this.handleChange(event, "phone")}
              />
              <p style={styles.buttonText}>Member since:</p><p style={styles.inputText}>{`${user.dateJoined}`}</p>
            </div>
          </div>
          <div className="flex-row" id="bio-badges">
            <div className="flex-col" id="bio" style={styles.inputText}>
              {user.bio}
            </div>
            <br />
            <p style={styles.buttonText}>Badges</p>
            <div className="flex-col" id="badges" style={styles.inputText}>
            { user.badges ? 
                <ul>
                  {user.badges.map( (badge, index) => <Avatar key={index} src={badge}/> )}
                </ul>
              :
              <div>No badges yet!</div>
            }
            </div>
            <br />
          </div>
          <p style={styles.buttonText}>Skills</p>
          <div className="flex-row" id="skills">
            <div className="flex-col" id="skills" style={styles.inputText}>
              { user.skills ?
                <ul>
                  {user.skills.map((skill, index) => {
                    return <li key={index}>{skill}</li>
                  })}
                </ul>
                :
                <div>No skills inputed yet!</div>
              }
            </div>
            <br />
          </div>
          <div className="flex-row">
            <div className="flex-col">
              <ul>
              { this.props.markers && this.props.markers.filter(marker => marker.uid === user.uid).map((marker, index) => (
                <Link to="/request" key={index}><li>{marker.title}</li></Link>
              )) }
              </ul>
            </div>
          </div>
          </form>
        </div>
        :
        <div>
        No user signed in.
        </div>
      }
    </div>
  )}
}

const mapStateToProps = (state) => ({ currentUser: state.currentUser, markers: state.map.markers })
const mapDispatchToProps = { getMarkers, getUserLocation, updateUser }
export default connect(mapStateToProps, mapDispatchToProps)(EditableProfile)