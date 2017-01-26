'use strict'

import { RECEIVE_REQUESTS } from '../constants'

export const receiveRequests = (requests) => ({
  type: RECEIVE_REQUESTS,
  requests
})
