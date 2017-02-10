import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory } from 'react-router'

const HomeLoggedOut = (props) => {
  return (
  <div>
    <div className="hero flex-container">
      <div className="hero-tagline flex-row">
        <h1>Build your support system.</h1>
      </div>
    </div>
    <div className="gradient flex-container">
      <div className="flex-row">
      </div>
      <div className="flex-row">
        <h1>Our Mission</h1>
      </div>
      <div className="flex-row mission-text">
        <p className="p-color-white">
          Bodhi (pronounced Bo-dee) is a social network for fostering community support systems.
        </p>
        <p className="p-color-white">
          Our mission is to help users give and receive help easily, solidifying online connections into a real network through the completion of good deeds. Whether you just have an extra hour to spare and want to use it to help someone nearby, or just moved to the city and want to meet new people, we hope you'll dive in and get involved.
        </p>
        <p className="p-color-white">
          We wish to celebrate the good karma it brings to ourselves and to the places we live when we know our neighbors and are actively involved in our communities (not just liking Facebook statuses).
        </p>
        <RaisedButton
          className="form-button"
          label="Login or Sign up"
          labelColor="#533BD7"
          backgroundColor="white"
          onClick={() => browserHistory.push('/loginsignup')}/>
      </div>
    </div>
  </div>
)}

export default HomeLoggedOut
