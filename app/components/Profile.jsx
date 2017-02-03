import React, {Component} from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import TextField from 'material-ui/TextField';
import { Link } from 'react-router'
import { getMarkers, getUserLocation } from '../reducers/map'
import { browserHistory } from 'react-router'
import ContentCreate from 'material-ui/svg-icons/content/create'
import FlatButton from 'material-ui/FlatButton'

export class Profile extends Component {

    constructor(props) {
      super(props)
      this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
      browserHistory.push('/EditableProfile');
    }

    componentDidMount() {
      this.props.getMarkers()
    }

    render() {
    const user = this.props.currentUser
    return (
      <div className="profile">
        {
          user ?
          <div>
          <FlatButton
            label="Edit Profile"
            labelPosition="before"
            icon={<ContentCreate/>}
            onClick={this.handleClick}
          />
            <div className="flex-row">
              <div className="flex-col">
                <Avatar src={user.picture}/>
                <p>{"Name:" + (user.name ? user.name : " What's your name?")}</p>
                <p>{`Email: ${user.email}`}</p>
                <p>{"Phone:" + (user.phone ? user.phone : " What's your number?")}</p>
                <p>{`Member since: ${user.dateJoined}`}</p>
              </div>
            </div>
            <div className="flex-row" id="bio-badges">
              <div className="flex-col" id="bio">
                {user.bio}
              </div>
              <div className="flex-col" id="badges">
                <ul>
                 { user.badges ? 
                     <ul>
                       {user.badges.map( (badge, index) => <Avatar key={index} src={badge}/> )}
                     </ul>
                   :
                   <div>No badges yet!</div>
                 }
                </ul>
              </div>
            </div>
            <div className="flex-row" id="skills">
              <div className="flex-col">
                <ul>
                  { user.skills ?
                    <ul>
                      {user.skills.map((skill, index) => {
                        return <li key={index}>{skill}</li>
                      })}
                    </ul>
                    :
                    <div>No skills inputed yet!</div>
                  }
                </ul>
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
    )
  }
}

const mapStateToProps = (state) => ({ currentUser: state.currentUser, markers: state.map.markers })
const mapDispatchToProps = { getMarkers, getUserLocation }
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
