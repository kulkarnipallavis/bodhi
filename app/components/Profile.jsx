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

    const styles = {
      inputText: {color: 'white'},
      buttonText: {color: '#533BD7'}
    }

    return (
      <div className="profile" style={styles}>
        {
          user ?
          <div>
          <FlatButton
            style={{color:"#533BD7"}}
            label="Edit Profile"
            labelPosition="before"            
            icon={<ContentCreate/>}
            onClick={this.handleClick}
          />
            <div className="flex-row">
              <div className="flex-col" style={styles.inputText}>
                <Avatar src={user.picture}/>
                <p style={styles.buttonText}>Name:</p><p style={styles.inputText}>{(user.name ? user.name : " What's your name?")}</p><br/>
                <p style={styles.buttonText}>Email:</p><p>{`${user.email}`}</p><br/>
                <p style={styles.buttonText}>Member since:</p><p>{`${user.dateJoined}`}</p><br/>
              </div>
            </div>
            <p style={styles.buttonText}></p>
            <div className="flex-row" id="bio-badges">
              <div className="flex-col" id="bio">
                {user.bio}
              </div><br/>
              <p style={styles.buttonText}>Badges</p>
              <div className="flex-col" id="badges" style={styles.inputText}>
                <ul>
                 { user.badges ? 
                     <ul>
                       {user.badges.map( (badge, index) => <Avatar key={index} src={badge}/> )}
                     </ul>
                   :
                   <div>No badges yet!</div>
                 }
                </ul>
              </div><br/>
            </div>
            <p style={styles.buttonText}>Skills</p>
            <div className="flex-row" id="skills" style={styles.inputText}>
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
              </div><br/>
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
          <div style={styles.inputText}>
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
