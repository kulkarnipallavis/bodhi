import { combineReducers } from 'redux'

import requestReducer from './requestReducer'

const rootReducer = combineReducers({
  requests: requestReducer
})

export default rootReducer
