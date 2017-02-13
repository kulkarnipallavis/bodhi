import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  map: require('./map').default,
  currentUser: require('./auth').default,
  home: require('./home').default,
  offersReceived: require('./receive-help').default,
  profileUser: require('./users').default
})

export default rootReducer
