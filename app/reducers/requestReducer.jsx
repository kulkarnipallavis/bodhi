'use strict'

import { RECEIVE_REQUESTS } from './constants'
import firebase from '../firebase.jsx'


const requestReducer = (requests = [], action) => {
  switch (action.type) {
    case RECEIVE_REQUESTS: 
    	return action.requests

    default: return requests
  }
}


export const receiveRequests = (requests) => ({
  type: RECEIVE_REQUESTS,
  requests
})

// export const addRequest = (request) => ({
// 	type: ADD_REQUEST,

// })

export const addRequest = (request) =>(
	dispatch =>
		firebase.database().ref 


)
export default requestReducer
