'use strict'

//import { RECEIVE_REQUESTS } from './constants'
import { database } from '../firebase.jsx'
import firebase from 'firebase'

export const addRequest = (request) =>  dispatch => {
  const newRequestKey = database.ref().child('Requests').push().key

  let date = new Date
  request.date = date.toDateString()

  let updates = {};
  updates[`/Requests/${newRequestKey}`] = request

  return database.ref().update(updates)
}

export const updateRequestStatus = (status, markerKey) => {
  return dispatch => {
    let statusUpdate = {}
    statusUpdate[`Requests/${markerKey}/status`] = 'pending'

    return database.ref().update(statusUpdate)
  }
}
