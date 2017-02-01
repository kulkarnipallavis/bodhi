import React from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import {auth} from '../../firebase.jsx'

const mapStateToProps = (state) => ({ currentUser: state.currentUser })

export default connect(mapStateToProps)(class Navbar extends React.Component {

constructor() {
  super()

  this.logout = this.logout.bind(this)
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

render() {

const user = this.props.currentUser

return (
  <div>
    <AppBar
      id="navbar"
      className="gradient-nav"
      showMenuIconButton={false}
      title={<Link to="/"><span><h2 id="navbar-brand">Bodhi</h2></span></Link>}
      iconElementRight={
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}>
          <Link to="/map"><MenuItem className="nav-item" primaryText="Who's in Need?"/></Link>
          <Link to="/request"><MenuItem className="nav-item" primaryText="I Need Help!"/></Link>
          <Divider/>
          {
          !user ?
          <div>
            <Link to="/loginenter"><MenuItem className="nav-item" primaryText="Log in"/></Link>
            <Link to="/signup"><MenuItem className="nav-item" primaryText="Sign up"/></Link>
          </div>
          : <Link onClick={this.logout}><MenuItem className="nav-item" primaryText="Log out" /></Link>
          }
        </IconMenu>
      }/>
  </div>
)}
})
