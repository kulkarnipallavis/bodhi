import React from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Badge from 'material-ui/Badge'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import {auth} from '../../firebase.jsx'


const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  offersReceived: state.offersReceived
})

export default connect(mapStateToProps)(class Navbar extends React.Component {

  constructor() {
    super()
    this.logout = this.logout.bind(this)
  }

  logout(event) {
    event.preventDefault()
    auth().signOut()
    .then( () => browserHistory.push('/'), (err) => console.error(err))
  }

  render() {

    const user = this.props.currentUser
    const offers = this.props.offersReceived

    return (
      <div>
        <AppBar
          id="navbar"
          className="gradient-nav"
          style={{ zIndex: 0.1 }}
          showMenuIconButton={offers ? true : false}
          title={<Link to="/"><span><h2 id="navbar-brand">Bodhi</h2></span></Link>}
          iconElementLeft={ offers ?
            <Link to="/offers">
              <Badge
                style={{ padding: '2px' }}
                badgeContent={Object.keys(offers).length}>
                  <IconButton tooltip="Notifications">
                    <NotificationsIcon />
                  </IconButton>
              </Badge>
            </Link>
              : null}
          iconElementRight={
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}>
              { !user ?
                <div>
                  <Link to="/map"><MenuItem className="nav-item" primaryText="Who's in Need?"/></Link>
                  <Divider/>
                  <Link to="/loginenter"><MenuItem className="nav-item" primaryText="Log in"/></Link>
                  <Link to="/signup"><MenuItem className="nav-item" primaryText="Sign up"/></Link>
                </div>
                : <div>
                    <Link to="/map"><MenuItem className="nav-item" primaryText="Who's in Need?"/></Link>
                    <Link to="/requesthelp"><MenuItem className="nav-item" primaryText="I Need Help!"/></Link>
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
