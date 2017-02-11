import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Avatar from 'material-ui/Avatar'
import { getMarkers } from '../reducers/map'
import ContentCreate from 'material-ui/svg-icons/content/create'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextFieldToggle from './TextFieldToggle'
import RadioFieldToggle from './RadioFieldToggle'
import { updateUser, sendNetworkRequest } from '../reducers/auth'


export class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editingName: false,
      editingEmail: false,
      editingPhone: false,
      editingBio: false
    }
  }

  componentDidMount() {
    this.props.getMarkers()
  }

  componentWillReceiveProps(newProps, oldProps){
    if (newProps.currentUser) {
      const state = Object.assign({}, newProps.currentUser, {
        editingName: false,
        editingEmail: false,
        editingPhone: false,
        editingBio: false,
        editingPrivacy: false
      })
      this.setState(state)
    }
  }

  handleClickEdit = field => event => this.setState({ [`editing${field}`]: true })

  handleClickCancelEdit = field => event => this.setState({ [`editing${field}`]: false })

  handleClickLoginSignup = event => browserHistory.push('/loginsignup')

  handleClickHome = event => browserHistory.push('/feed')

  handleChange = field => event => {
    const value = event.target.value
    this.setState({ [field]: value })
  }

  handleChangeRadio = (event, value) => {
    this.setState({ privacy: value })
  }

  handleSave = field => event => {
    event.preventDefault()
    const user = {
      badges: this.state.badges,
      bio: this.state.bio,
      dateJoined: this.state.dateJoined,
      email: this.state.email,
      name: this.state.name,
      phone: this.state.phone,
      picture: this.state.picture,
      skills: this.state.skills,
      uid: this.state.uid,
      privacy: this.state.privacy
    }

    this.props.updateUser(user)
    this.setState({ [`editing${field}`]: false })
  }

  humanReadableDate(string) {
    const memberSince = new Date(string).toDateString().slice(11)
    return memberSince
  }

  render() {
    const user = this.props.currentUser
    const styles = {
      text: { color: 'white' },
      underlineFocusStyle: { borderColor: 'white' },
      inputText: { color: 'white' },
      errorStyle: { color: '#FC2A34' },
      radioStyle: { color: '#FFFFFF', fill: '#FFFFFF' }
    }

    return (
      <div className="profile gradient flex-container">
        { user ?
          <div>
            <div className="flex-row" id="avatar">
              <Avatar size={80} src={user.picture}/>
            </div>
            <div className="flex-row  align-left" id="member-since">
              <h2>Member since:</h2>
                <p className="p-color-white">
                  { user.dateJoined ? this.humanReadableDate(user.dateJoined) : '' }
                </p>
            </div>
            <div id="editable-profile-info">
              { this.state.editingPrivacy ?

                <RadioFieldToggle
                  styles={styles}
                  field="Privacy"
                  value={this.state.privacy || ''}
                  user={ user ? user : {} }
                  handleChangeRadio={this.handleChangeRadio}
                  handleSave={this.handleSave}
                  handleCancel={this.handleClickCancelEdit} />
                :
                <div className="flex-row">
                  <IconButton
                    type="button"
                    className="edit-button"
                    onClick={this.handleClickEdit('Privacy')}>
                    <ContentCreate color="white"/>
                  </IconButton>
                  <h2>Profile Privacy:</h2>
                    <p className="p-color-white">
                      { user.privacy ? user.privacy : "Set your profile privacy!" }
                    </p>
                </div> }

              { this.state.editingName ?

                <TextFieldToggle
                  styles={styles}
                  field="Name"
                  value={this.state.name || ''}
                  user={ user ? user : {} }
                  handleChange={this.handleChange}
                  handleSave={this.handleSave}
                  handleCancel={this.handleClickCancelEdit}/>
                :
                <div className="flex-row">
                  <IconButton
                    type="button"
                    className="edit-button"
                    onClick={this.handleClickEdit('Name')}>
                    <ContentCreate color="white"/>
                  </IconButton>
                  <h2>Name:</h2>
                    <p className="p-color-white">
                      { user.name ? user.name : " What's your name?" }
                    </p>
                </div> }

              { this.state.editingEmail ?

                <TextFieldToggle
                  styles={styles}
                  field="Email"
                  value={this.state.email || ''}
                  user={ user ? user : {} }
                  handleChange={this.handleChange}
                  handleSave={this.handleSave}
                  handleCancel={this.handleClickCancelEdit}/>
                :
                <div className="flex-row">
                  <IconButton
                    className="edit-button"
                    onClick={this.handleClickEdit('Email')}>
                    <ContentCreate color="white"/>
                  </IconButton>
                  <h2>Email:</h2>
                    <p className="p-color-white">{user.email}</p>
                </div> }

              { this.state.editingPhone ?

                <TextFieldToggle
                  styles={styles}
                  field="Phone"
                  value={this.state.phone || ''}
                  user={ user ? user : {} }
                  handleChange={this.handleChange}
                  handleSave={this.handleSave}
                  handleCancel={this.handleClickCancelEdit}/>
                :
                <div className="flex-row">
                  <IconButton
                    className="edit-button"
                    onClick={this.handleClickEdit('Phone')}>
                    <ContentCreate color="white"/>
                  </IconButton>
                  <h2>Phone:</h2>
                    <p className="p-color-white">
                      { user.phone ? user.phone : " What's your number?" }
                    </p>
                </div> }

              { this.state.editingBio ?

                <TextFieldToggle
                  styles={styles}
                  field="Bio"
                  value={this.state.bio || ''}
                  user={ user ? user : {} }
                  handleChange={this.handleChange}
                  handleSave={this.handleSave}
                  handleCancel={this.handleClickCancelEdit}/>
                :
                <div className="flex-row">
                  <IconButton
                    className="edit-button"
                    onClick={this.handleClickEdit('Bio')}>
                    <ContentCreate color="white"/>
                  </IconButton>
                  <h2>Bio:</h2>
                    <p className="p-color-white">
                      {user.bio ? user.bio : "What's your story?"}
                    </p>
                </div> }

            </div> {/* end #editable-profile-info */}

            <div className="flex-row" id="badges" style={styles.inputText}>
              <h2>Badges:</h2>
                <ul>
                 { user.badges ?
                   <ul>
                     {user.badges.map( (badge, index) => <Avatar key={index} src={badge}/> )}
                   </ul>
                   :
                   <p className="p-color-white">No badges yet!</p> }
                </ul>
            </div>
            <div className="flex-row" id="skills">
              <h2>Skills:</h2>
              { user.tags ?
                <ul>
                { user.tags.map((skill, index) => {
                    return (
                      <li key={index}>
                        <p className="p-color-white">{skill}</p>
                      </li> )})
                }
                </ul>
                :
                <p className="p-color-white">No skills yet!</p> }
            </div>
            <div className="flex-row" id="request-history">
              <h2>Request History:</h2>
              <ul>
              { this.props.markers &&
                this.props.markers
                .filter(marker => marker.uid === user.uid)
                .map((marker, index) => {
                  <li key={index}>
                    <p className="p-color-white">{marker.title}</p>
                  </li>
                })
              }
              </ul>
            </div>
            <div className="flex-row">
              <RaisedButton
                type="button"
                className="form-button"
                label="Home"
                labelColor="#533BD7"
                backgroundColor="white"
                onClick={this.handleClickHome}/>
            </div>
          </div>
          :
          <div className="flex-row">
            <RaisedButton
              className="form-button"
              label="Please Log in or Sign up"
              labelColor="#533BD7"
              backgroundColor="white"
              onClick={this.handleClickLoginSignup}/>
          </div>
        }
      </div>
    )
  }
}

Profile.propTypes = {
  currentUser: PropTypes.object,
  markers: PropTypes.array,
  grabMarkers: PropTypes.func
}

const mapStateToProps = state => ({ currentUser: state.currentUser, markers: state.map.markers })
const mapDispatchToProps = { getMarkers, updateUser, sendNetworkRequest }

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
