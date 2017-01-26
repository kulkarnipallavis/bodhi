import { combineReducers } from 'redux'

import requestReducer from './requestReducer'

const rootReducer = combineReducers({
  requests: requestReducer,
  map: require('./map').default
})

export default rootReducer
