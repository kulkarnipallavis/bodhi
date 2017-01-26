import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  map: require('./map').default
})

export default rootReducer
