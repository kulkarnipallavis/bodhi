import React from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
<<<<<<< HEAD
import ContentCreate from 'material-ui/svg-icons/content/create'
=======
import Badge from 'material-ui/Badge'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
>>>>>>> a3510c168af93854813f60068b3925b62098740c
import {auth} from '../../firebase.jsx'


const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  offersReceived: state.offersReceived
})


export default connect(mapStateToProps)(class Navbar extends React.Component {

constructor() {
  super()
  this.state = {
    editable: false
  }
  this.logout = this.logout.bind(this)
  this.handleClick = this.handleClick.bind(this)
}

logout(e) {
  e.preventDefault()
  auth().signOut()
  .then( () => {
    browserHistory.push('/')
    console.log('sign-out successful')
  }, (err) => {
    console.log(err)
  })
}

handleClick(e) {
  this.setState({
    editable: true
  })
  browserHistory.push('/EditableProfile');
}

render() {

const user = this.props.currentUser
const offers = this.props.offersReceived

return (
  <div>
    <AppBar
      id="navbar"
      showMenuIconButton={offers ? true : false}
      title={<Link to="/"><span><h2 id="navbar-brand">Bodhi</h2></span></Link>}
      iconElementLeft={offers ?
        <Link to="/offers">
          <Badge
            style={{ padding: '2px'}}
            badgeContent={Object.keys(offers).length}>
              <IconButton tooltip="Notifications">
                <NotificationsIcon />
              </IconButton>
          </Badge>
        </Link>
          : null}
      iconElementRight={
        <div>
        <ContentCreate color={'#fff'} onClick={this.handleClick}/>
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}>
          {
          !user ?
          <div>
            <Link to="/loginenter"><MenuItem primaryText="Log in"/></Link>
            <Link to="/signup"><MenuItem primaryText="Sign up"/></Link>
          </div>
          :
          <div>
            <Link to="/map"><MenuItem primaryText="Who's in Need?"/></Link>
            <Link to="/request"><MenuItem primaryText="I Need Help!"/></Link>
            <Link onClick={this.logout}><MenuItem primaryText="Log out" /></Link>
          </div>
          }
        </IconMenu>
        </div>
      }/>
  </div>
)}
})
