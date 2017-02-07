import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  map: require('./map').default,
  currentUser: require('./auth').default,
  home: require('./home').default,
  offersReceived: require('./receive-help').default,
  LB: require('./lightbox.jsx').default
})

export default rootReducer
