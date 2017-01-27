import React from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import {auth} from '../../firebase.jsx'

const mapStateToProps = (state) => ({ auth: auth })


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

const user = this.props.auth

return (
  <div>
    <AppBar
      id="navbar"
      showMenuIconButton={false}
      title={<Link to="/"><span><h2 id="navbar-brand">Bodhi</h2></span></Link>}
      iconElementRight={
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}>
          <Link to="/map"><MenuItem primaryText="Who's in Need?"/></Link>
          <Link to="/request"><MenuItem primaryText="I Need Help!"/></Link>
          {
          !user ?
          <div>
            <Link to="/loginenter"><MenuItem primaryText="Log in"/></Link>
            <Link to="/signup"><MenuItem primaryText="Sign up"/></Link>
          </div>
          : <Link onClick={this.logout}><MenuItem primaryText="Log out" /></Link>
          }
        </IconMenu>
      }/>
  </div>
)}
})
