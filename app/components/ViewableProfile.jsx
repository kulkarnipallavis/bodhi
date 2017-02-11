import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton'

class ViewableProfile extends Component {

  humanReadableDate = string => {
    const memberSince = new Date(string).toDateString().slice(11)
    return memberSince
  }

  render() {
    const userViewing = this.props.userViewing
    const currentUser = this.props.currentUser

    return (
      <div className="profile gradient flex-container">
        { userViewing && currentUser &&
          (userViewing.privacy === 'public' ||
          (userViewing.network && userViewing.network[currentUser.uid])) ?
          /* profile only renders if the profile user's privacy is set to public,
          or the viewer is in the profile user's network */

          <div>
            <div className="flex-row" id="avatar">
              { userViewing.picture ? <Avatar size={80} src={userViewing.picture} /> : '' }
            </div>
            <div className="flex-row" id="member-since">
              <h2>Member since:</h2>
              <p className="p-color-white">
                { userViewing.dateJoined ? this.humanReadableDate(userViewing.dateJoined) : '' }
              </p>
            </div>
            <div className="flex-row">
              <h2>Name:</h2>
              <p className="p-color-white">
                { userViewing.name ? userViewing.name : '' }
              </p>
            </div>
            <div className="flex-row">
              <h2>Bio:</h2>
              <p className="p-color-white">
                { userViewing.bio ? userViewing.bio : ''}
              </p>
            </div>
            <div className="flex-row">
              <RaisedButton
                type="button"
                className="form-button"
                label="Request Connection"
                labelColor="#533BD7"
                backgroundColor="white" />
            </div>
          </div>
          :
          <div>
            <div className="flex-row">
              <h1>
                This user's profile is private.*
              </h1>
              <p className="p-color-white italic p-marginLR">
                *Only those in their network can see their information. Click below to ask them to connect!
              </p>
            </div>
            <div className="flex-row">
              <RaisedButton
                type="button"
                className="form-button"
                label="Connect"
                labelColor="#533BD7"
                backgroundColor="white" />
            </div>
          </div>
        }
      </div>
    )
  }
}

ViewableProfile.propTypes = {
  handleAddConnection: PropTypes.func,
  grabUserProfileInfo: PropTypes.func,
  currentUser: PropTypes.object
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  userViewing: state.profileUser
})

const mapDispatchToProps = dispatch => ({
  // handleAddConnection: uid => dispatch(CALL IMPORTED ADDTONETWORK THUNK HERE)
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewableProfile)
