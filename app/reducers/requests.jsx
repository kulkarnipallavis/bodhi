'use strict'

import { database } from '../firebase.jsx'
import firebase from 'firebase'

// _______________ CONSTANTS _______________ //

export const RECEIVE_REQUESTS = 'RECEIVE_REQUESTS'

// _______________ REDUCER _______________ //

const requestReducer = (requests = [], action) => {
  switch (action.type) {
    case RECEIVE_REQUESTS: return action.requests
    default: return requests
  }
}

export default requestReducer

// _______________ ACTION CREATORS _______________ //

export const receiveRequests = (requests) => ({ type: RECEIVE_REQUESTS, requests })

// _______________ THUNKS _______________ //

export const getAllRequests = () => {
  return dispatch => {
    firebase.database().ref('Requests')
    .on('value', snapshot => {
      let requestObj = snapshot.val()
      let requests = []

      for (var key in requestObj) {
        requests.push(requestObj[key])
      }

      dispatch(receiveRequests(requests))
    })
  }
}

export const addRequest = request => dispatch => {
  const newRequestKey = database.ref().child('Requests').push().key;
  let date = new Date
  request.date = date.toDateString()

  let updates = {}
  updates['/Requests/' + newRequestKey] = request

  return database.ref().update(updates)
}

export const updateRequestStatus = (status, markerKey) => dispatch => {
    let statusUpdate = {}
    statusUpdate[`Requests/${markerKey}/status`] = 'pending'

    return database.ref().update(statusUpdate)
  }
