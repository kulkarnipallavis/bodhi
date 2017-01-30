import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  map: require('./map').default,
  auth: require('./auth').default,
  home: require('./home').default
});

export default rootReducer;
