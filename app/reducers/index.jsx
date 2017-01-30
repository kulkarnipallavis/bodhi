import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  map: require('./map').default,
  auth: require('./auth').default
})

export default rootReducer
