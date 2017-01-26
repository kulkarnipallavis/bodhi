import { combineReducers } from 'redux'

import requestReducer from './requestReducer'

const rootReducer = combineReducers({
<<<<<<< HEAD
  requests: requestReducer
=======
  auth: require('./auth').default,
  map: require('./map').default
>>>>>>> a44a9d1a7a164014c9cfe474a9563ba97879fb1a
})

export default rootReducer
