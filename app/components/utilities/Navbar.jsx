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
      title={<Link to="/"><span>Bodhi</span></Link>}
      iconElementRight={
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}>
          <MenuItem primaryText={<Link to="/map">Offer Help</Link>}/>
          <MenuItem primaryText={<Link to="/request">Request Help</Link>}/>
        </IconMenu>
      }/>
  </div>
)

export default Navbar
