import React from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import ContentCreate from 'material-ui/svg-icons/content/create'
import {auth} from '../../firebase.jsx'

const mapStateToProps = (state) => ({ currentUser: state.currentUser })


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

return (
  <div>
    <AppBar
      id="navbar"
      showMenuIconButton={false}
      title={<Link to="/"><span><h2 id="navbar-brand">Bodhi</h2></span></Link>}
      iconElementRight={
        <div>
          <ContentCreate color={'#fff'} onClick={this.handleClick}/>
          <IconMenu
            color={'#fff'}
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
        </div>
        }
      />
  </div>
)}
})
