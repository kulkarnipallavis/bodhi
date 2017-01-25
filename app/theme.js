import { tealA100, tealA300, tealA500 } from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'
import spacing from 'material-ui/styles/spacing'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const theme = getMuiTheme({
  spacing,
  zIndex: 0,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: tealA300,
    primary2Color: tealA500,
    primary3Color: blueGrey100,
    accent2Color: tealA100,
    accent3Color: lightBlue500,
    textColor: grey900,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey400,
    disabledColor: fade(darkBlack, 0.3),
  }
})

export default theme
