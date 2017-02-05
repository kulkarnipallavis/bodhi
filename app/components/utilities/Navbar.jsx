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
      browserHistory.push('/')
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
          showMenuIconButton={offers.length ? true : false}
          title={
           <Link to="/">
             <FlatButton>
               <h2>Bodhi</h2>
             </FlatButton>
           </Link> }
          iconElementLeft={offers.length ?
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
                open={this.state.showMenu || false}
                onRequestChange={open => this.setState({showMenu: open})}
                iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                {
                !user ?
                <div>
                  <Link to="/loginenter"><MenuItem onClick={this.handleSelect} className="nav-item" primaryText="Log in"/></Link>
                  <Link to="/signup"><MenuItem onClick={this.handleSelect} className="nav-item" primaryText="Sign up"/></Link>
                </div>
                :
                <div>
                  <Link to="/map"><MenuItem onClick={this.handleSelect} className="nav-item" primaryText="Who's in Need?"/></Link>
                  <Link to="/request"><MenuItem onClick={this.handleSelect} className="nav-item" primaryText="I Need Help!"/></Link>
                  <Link to="/profile"><MenuItem onClick={this.handleSelect} className="nav-item" primaryText="Profile"/></Link>
                  <Divider/>
                  <Link onClick={this.logout}><MenuItem onClick={this.handleSelect} className="nav-item" primaryText="Log out" /></Link>
                </div>
                }
              </IconMenu>
          }/>
      </div>
    )
  }
})
