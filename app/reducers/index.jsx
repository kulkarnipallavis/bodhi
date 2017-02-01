import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  map: require('./map').default,
  currentUser: require('./auth').default,
  home: require('./home').default,
  user: require('./user').default
});

export default rootReducer
