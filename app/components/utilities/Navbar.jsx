import React from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Badge from 'material-ui/Badge'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import {auth} from '../../firebase.jsx'
import Divider from 'material-ui/Divider'
import { getOffers } from '../../reducers/receive-help'
import { loggedOut } from '../../reducers/auth'

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  offersReceived: state.offersReceived
})

const mapDispatchToProps = (dispatch) => ({
  getOffers: (offers) => {
    dispatch(getOffers(offers))
  },
  loggedOutDispatch: () => {
    dispatch(loggedOut())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(class Navbar extends React.Component {

  constructor() {
    super()
    this.state = {
      showMenu: false
    }
    this.logout = this.logout.bind(this)
  }

  logout(e) {
    e.preventDefault()
    this.props.getOffers([])
    auth().signOut()
    .then( () => {
      this.props.loggedOutDispatch(loggedOut())
      browserHistory.push('/loginsignup')
      window.location.reload()
    }, (err) => {
      console.error(err)
    })
  }

  handleSelect = () => {
    const show = !this.state.showMenu
    this.setState({ showMenu: show })
  }

  render() {

    const user = this.props.currentUser
    const userMsg = user ? this.props.currentUser.message : null
    const userMsgArr = userMsg ?
      Object.keys(userMsg).map((key) => {
        return userMsg[key]
      }) : []
    const offers = this.props.offersReceived
    const notifications = (userMsgArr || offers) ? [...offers, ...userMsgArr] : []

    const styles = {
      badgeStyle: { padding: '0', top: '1px', left: '11px' },
      notificationIcon: { color: '#F0B259' }
    }

    const bodhiButton =   (<span id="navbar-brand">Bodhi</span>)

    return (
      <div>
        <AppBar
          id="navbar"
          className="gradient"
          zDepth={0}
          showMenuIconButton={notifications.length ? true : false}
          title={ user ?
           <Link to="/feed">{bodhiButton}</Link> : <Link to="/home">{bodhiButton}</Link> }
          iconElementLeft={notifications.length ?
            <Link to="/notifications">
              <Badge
                style={styles.badgeStyle}
                badgeContent={notifications.length}>
                  <IconButton
                    iconStyle={styles.notificationIcon}
                    tooltip="Notifications">
                    <NotificationsIcon/>
                  </IconButton>
              </Badge>
            </Link>
              : null }
          iconElementRight={
              <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                {
                !user ?
                <div>
                  <Link to="/home"><MenuItem className="nav-item" primaryText="Home"/></Link>
                  <Link to="/loginsignup"><MenuItem className="nav-item" primaryText="Login / Signup"/></Link>
                </div>
                :
                <div>
                  <Link to="/map"><MenuItem className="nav-item" primaryText="Who's in Need?"/></Link>
                  <Link to="/request"><MenuItem className="nav-item" primaryText="I Need Help!"/></Link>
                  <Link to="/editprofile"><MenuItem className="nav-item" primaryText="Profile"/></Link>
                  <Link to="/feed">
                    <MenuItem className="nav-item" primaryText="Activity Feed"></MenuItem>
                  </Link>
                  <Link to="/network"><MenuItem className="nav-item" primaryText="My Network"/></Link>
                  <Divider/>
                  <Link onClick={this.logout}><MenuItem className="nav-item" primaryText="Log out" /></Link>
                </div>
                }
              </IconMenu>
          }/>
      </div>
    )
  }
})
