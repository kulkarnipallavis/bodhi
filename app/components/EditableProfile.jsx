import React, {Component} from 'react'
// import { auth } from '../firebase.jsx'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/FlatButton'
import { Link } from 'react-router'
import { getMarkers, getUserLocation } from '../reducers/map'

class EditableProfile extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getMarkers();
  }

  handleChange(event, type) {
  // 
  }

  handleSubmit(event){
    event.preventDefault()
  }

  render () {
  const user = this.props.currentUser;
  return (
    <div className="profile">
      {
        user ?
        <div>
          <RaisedButton label="Submit Changes" primary={true} type="submit" onClick={this.handleSubmit}/>
          <div className="flex-row">
            <div className="flex-col">
              <Avatar src={user.picture}/>
              <p> Name:</p>
              <TextField
                defaultValue={user.name}
                onChange={(event)=> this.handleChange(event, "name")}
              />
              <p>Email:</p>
              <TextField 
                  defaultValue = {`${user.email}`}
              />
              <p>{`Member since: ${user.date}`}</p>
            </div>
          </div>
          <div className="flex-row" id="bio-badges">
            <div className="flex-col" id="bio">
              {user.bio}
            </div>
            <div className="flex-col" id="badges">
            { user.badges ? 
                <ul>
                  {user.badges.map( (badge, index) => <Avatar key={index} src={badge}/> )}
                </ul>
              :
              <div>No badges yet!</div>
            }
            </div>
          </div>
          <div className="flex-row" id="skills">
            <div className="flex-col" id="skills">
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
const mapDispatchToProps = { getMarkers, getUserLocation }
export default connect(mapStateToProps, mapDispatchToProps)(EditableProfile)