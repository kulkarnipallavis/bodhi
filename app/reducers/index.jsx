import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  map: require('./map').default
})

export default rootReducer
