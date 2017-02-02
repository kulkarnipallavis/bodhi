import React, {Component} from 'react'
// import { auth } from '../firebase.jsx'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/FlatButton'
import { Link } from 'react-router'
import { getMarkers, getUserLocation } from '../reducers/map'
import { updateUser } from '../reducers/user'
import { browserHistory } from 'react-router'

class EditableProfile extends Component {

  constructor(props){
    super(props);
    this.state = Object.assign({}, this.props.currentUsern)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
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
    this.props.updateUser(user.uid, this.state)
  }

  handleClick(e) {
    browserHistory.push('/profile')
  }

  render () {
  const user = this.props.currentUser;
  console.log("PROPS", this.props)
  return (
    <div className="profile">
      {
        user ?
        <div>
        <form onSubmit={this.handleSubmit}>
          <RaisedButton label="Submit Changes" primary={true} type="submit" onClick={this.handleClick}/>
          <div className="flex-row">
            <div className="flex-col">
              <Avatar src={user.picture}/>
              <p> Name:</p>
              <TextField
                defaultValue={user.name}
                onChange={(event) => this.handleChange(event, "name")}
              />
              <p>Email:</p>
              <TextField 
                  defaultValue = {`${user.email}`}
                  onChange={(event)=> this.handleChange(event, "email")}
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