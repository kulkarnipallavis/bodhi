import { tealA400 } from 'material-ui/styles/colors'
import spacing from 'material-ui/styles/spacing'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const theme = getMuiTheme({
  spacing,
  zIndex: 0,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: tealA400,
  }
})

export default theme
