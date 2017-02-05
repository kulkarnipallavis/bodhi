import React from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Badge from 'material-ui/Badge'
import FlatButton from 'material-ui/FlatButton'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import {auth} from '../../firebase.jsx'
import Divider from 'material-ui/Divider'
import { getOffers } from '../../reducers/receive-help'

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  offersReceived: state.offersReceived
})

const mapDispatchToProps = (dispatch) => ({
  getOffers: (offers) => {
    dispatch(getOffers(offers))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(class Navbar extends React.Component {

  constructor() {
    super()

    this.logout = this.logout.bind(this)
  }

  logout(e) {
    e.preventDefault()
    this.props.getOffers([])
    auth().signOut()
    .then( () => {
      browserHistory.push('/')
    }, (err) => {
      console.error(err)
    })
  }

  handleClick(event) {
    this.setState({
      editable: true
    })
    browserHistory.push('/EditableProfile');
  }

  render() {

    const user = this.props.currentUser
    const offers = this.props.offersReceived
    const styles = {
      badgeStyle: { padding: '0', top: '1px', left: '11px' },
      notificationIcon: { color: '#F0B259' }
    }

    return (
      <div>
        <AppBar
          id="navbar"
          className="gradient"
          zDepth={0}
          showMenuIconButton={!!offers}
          title={<Link to="/"><span><h2 id="navbar-brand">Bodhi</h2></span></Link>}
          iconElementLeft={ offers.length ?
            <Link to="/offers">
              <Badge
                style={styles.badgeStyle}
                badgeContent={Object.keys(offers).length}>
                  <IconButton
                    iconStyle={styles.notificationIcon}
                    tooltip="Unread Offers">
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
                  <Link to="/loginenter"><MenuItem className="nav-item" primaryText="Log in"/></Link>
                  <Link to="/signup"><MenuItem className="nav-item" primaryText="Sign up"/></Link>
                </div>
                :
                <div>
                  <Link to="/map"><MenuItem className="nav-item" primaryText="Who's in Need?"/></Link>
                  <Link to="/request"><MenuItem className="nav-item" primaryText="I Need Help!"/></Link>
                  <Link to="/profile"><MenuItem className="nav-item" primaryText="Profile"/></Link>
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
