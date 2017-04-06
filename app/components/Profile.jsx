import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Avatar from 'material-ui/Avatar'
import { receiveMarkers } from '../reducers/map'
import { uploadUserPhoto } from '../reducers/auth'
import ContentCreate from 'material-ui/svg-icons/content/create'
import ImageAddAPhoto from 'material-ui/svg-icons/image/add-a-photo'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
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
    const user = {
      badges: this.state.badges,
      bio: this.state.bio,
      dateJoined: this.state.dateJoined,
      email: this.state.email,
      name: this.state.name,
      phone: this.state.phone,
      skills: this.state.skills,
      uid: this.state.uid,
      privacy: this.state.privacy,
      picture: this.state.picture
    }
    user[field] = value
    this.props.updateUser(user)
  }

  handleChangeRadio = (event, value) => {
    const user = {
      badges: this.state.badges,
      bio: this.state.bio,
      dateJoined: this.state.dateJoined,
      email: this.state.email,
      name: this.state.name,
      phone: this.state.phone,
      skills: this.state.skills,
      uid: this.state.uid,
      privacy: value,
      picture: this.state.picture
    }

    this.props.updateUser(user)
  }

  handleImageUpload = event => {
    event.preventDefault()

    const picture = event.target.files[0]
    this.props.uploadUserPhoto(this.props.currentUser, picture)
  }

  handleSave = field => {
    const user = {
      badges: this.state.badges,
      bio: this.state.bio,
      dateJoined: this.state.dateJoined,
      email: this.state.email,
      name: this.state.name,
      phone: this.state.phone,
      skills: this.state.skills,
      uid: this.state.uid,
      privacy: this.state.privacy,
      picture: this.state.picture
    }

    this.props.updateUser(user)
  }

  humanReadableDate = string => {
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
      radioStyle: { color: '#FFFFFF', fill: '#FFFFFF', display: 'inline-block' },
      input: { display: 'none' },
      photo: { marginTop: '5px' },
      iconSize: { height:'30px', width:'40px', fill: "white" }
    }

    return (
      <div className="profile gradient flex-container">
        { user ?
          <div>
            <div className="flex-row" id="avatar" >
              <Avatar size={80} src={user.picture}/>
            </div>
            <div className="flex-row" id="photo" style={styles.photo}>
               <label>
              <span><ImageAddAPhoto style={styles.iconSize}/></span>
               <input type="file" style={styles.input} onChange={this.handleImageUpload}/>
               </label>
            </div>
            <div className="flex-row" id="member-since">
              <h2>Member since:</h2>
                <p className="p-color-white">
                  { user.dateJoined ? this.humanReadableDate(user.dateJoined) : '' }
                </p>
            </div>
            <div id="editable-profile-info">
              <RadioFieldToggle
                styles={styles}
                field="Privacy"
                value={this.state.privacy || this.props.currentUser.privacy}
                user={ user ? user : {} }
                handleChangeRadio={this.handleChangeRadio}
              />
              <br />
              <br />
              <TextFieldToggle
                styles={styles}
                field="Name"
                value={this.state.name || this.props.currentUser.name}
                user={ user ? user : {} }
                handleChange={this.handleChange}
              />
              <br />
              <TextFieldToggle
                styles={styles}
                field="*Email"
                value={this.state.email || this.props.currentUser.email}
                user={ user ? user : {} }
                handleChange={this.handleChange}
              />
              <br />
              <TextFieldToggle
                styles={styles}
                field="*Phone"
                value={this.state.phone || this.props.currentUser.phone}
                user={ user ? user : {} }
                handleChange={this.handleChange}
              />
              <br />
              <TextFieldToggle
                styles={styles}
                field="Bio"
                value={this.state.bio || this.props.currentUser.bio}
                user={ user ? user : {} }
                handleChange={this.handleChange}
              />
              <br />
              <div className="flex-row">
                <p className="p-color-white italic p-no-margin p-xs-font">*always private</p>
              </div>
            </div> {/* end #editable-profile-info */}
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
  currentUser: PropTypes.object.isRequired,
  markers: PropTypes.array.isRequired,
  grabMarkers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ currentUser: state.currentUser, markers: state.map.markers })
const mapDispatchToProps = { receiveMarkers, updateUser, sendNetworkRequest, uploadUserPhoto }

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
