'use strict'

import { RECEIVE_REQUESTS } from './constants'

const requestReducer = (requests = [], action) => {
  switch (action.type) {
    case RECEIVE_REQUESTS: return action.requests
    default: return requests
  }
}

export default requestReducer
