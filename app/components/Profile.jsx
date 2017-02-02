import React from 'react'
// import { auth } from '../firebase.jsx'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import { Link } from 'react-router'

const currentUser = {
  uid: 1,
  picture: '/img/avatar-w.svg',
  name: 'Chloe',
  date: 'August 2016',
  email: 'chloe@awesome.net',
  badges: ['/img/badge1.svg', '/img/badge2.svg'],
  bio: 'Oakland girl with a NY dream',
  skills: ['vegan ninja', 'dog-jogger', 'coding warrior']
}

const mapStateToProps = (state) => ({ currentUser, markers: state.map.markers })

export default connect(mapStateToProps)(props => {
  const user = currentUser

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
            <div>
              <ul>
              { /* Right now markers are added to state by componentDidMount in /map, so no markers here! */ }
              { props.markers && props.markers.filter(marker => marker.uid === user.uid).map(marker => (
                <Link to="/request"><li>{marker.title}</li></Link>
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
)
