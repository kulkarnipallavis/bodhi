import React, {Component} from 'react'
// import { auth } from '../firebase.jsx'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import TextField from 'material-ui/TextField';
import { Link } from 'react-router'
import { getMarkers, getUserLocation } from '../reducers/map'

class Profile extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: {
        uid: "7iiHpoNyiKRHLqEfTjP1Q7aAfNq1",
        picture: '/img/avatar-w.svg',
        name: 'Chloe',
        date: 'August 2016',
        email: 'chloe@awesome.net',
        badges: ['/img/badge1.svg', '/img/badge2.svg'],
        bio: 'Oakland girl with a NY dream',
        skills: ['vegan ninja', 'dog-jogger', 'coding warrior']
      }
    }
  }

  componentDidMount() {
    this.props.getMarkers();
  }

  render () {
  const user = this.state.user
  return (
    <div className="profile">
      {
        user ?
        <div>
          <div className="flex-row">
            <div className="flex-col">
              <Avatar src={user.picture}/>
              <p>{`Name: ${user.name}`}</p>
              <p>{`Email: ${user.email}`}</p>
              <p>{`Member since: ${user.date}`}</p>
            </div>
          </div>
          <div className="flex-row" id="bio-badges">
            <div className="flex-col" id="bio">
              {user.bio}
            </div>
            <div className="flex-col" id="badges">
              <ul>
                {user.badges.map( (badge, index) => <Avatar key={index} src={badge}/> )}
              </ul>
            </div>
          </div>
          <div className="flex-row" id="skills">
            <div className="flex-col">
              <ul>
                {user.skills.map((skill, index) => {
                  return <li key={index}>{skill}</li>
                })}
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
  )}
}

const mapStateToProps = (state) => ({markers: state.map.markers })
const mapDispatchToProps = { getMarkers, getUserLocation }
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
