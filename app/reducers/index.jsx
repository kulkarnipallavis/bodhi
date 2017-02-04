import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  map: require('./map').default,
  currentUser: require('./auth').default,
  home: require('./home').default,
  offersReceived: require('./receive-help').default
})

export default rootReducer
