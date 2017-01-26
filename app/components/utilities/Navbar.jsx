import React from 'react'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

const Navbar = () => (
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
        </IconMenu>
      }/>
  </div>
)

export default Navbar
