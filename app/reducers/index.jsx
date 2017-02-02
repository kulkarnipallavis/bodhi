import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  map: require('./map').default,
  currentUser: require('./auth').default,
  offers: require('./offers').default,
  users: require('./users').default,
  requests: require('./requests').default
})

export default rootReducer
