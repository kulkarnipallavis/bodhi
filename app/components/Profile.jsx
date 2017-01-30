import React from 'react'
// import { auth } from '../firebase.jsx'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'



const currentUser = {
  avatar: '/img/avatar-w.svg',
  name: 'Chloe',
  date: 'August 2016',
  email: 'chloe@awesome.net',
  badges: ['/img/badge1.svg', 'img/badge2.svg'],
  bio: 'Oakland girl with a NY dream',
  skills: ['vegan ninja', 'dog-jogger', 'coding warrior']
}

const mapStateToProps = (state) => ({ currentUser })

export default connect(mapStateToProps)((props) => {

  const user = props.currentUser

  return (

      <div className="profile">
        {
          user ?
          <div>
            <Row>
              <Col xs={12} sm={12} md={8} mdPull={4} lg={8} id="heading">
                <Image circle src={user.avatar}/>
                <p>{`Name: ${user.name}`}</p>
                <p>{`Email: ${user.email}`}</p>
                <p>{`Member since: ${user.date}`}</p>
              </Col>
            </Row>
            <Row id="bio-badges">
              <Col xs={12} sm={12} md={8} lg={8} id="bio">
                {user.bio}
              </Col>
              <Col xs={12} sm={12} md={4} lg={4} id="badges">
                <ul>
                  {user.badges.map((badge, index) => {
                    return <li key={index}>{badge}</li>
                  })}
                </ul>
              </Col>
            </Row>
            <Row id="skills">
              <ul>
                {user.skills.map((skill, index) => {
                  return <li key={index}>{skill}</li>
                })}
              </ul>
            </Row>
          </div>
          :
          <div>
          No user signed in.
          </div>
        }
    </div>

  )}
)
