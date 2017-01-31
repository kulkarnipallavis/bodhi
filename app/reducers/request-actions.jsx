'use strict'

//import { RECEIVE_REQUESTS } from './constants'
import { database } from '../firebase.jsx'
import firebase from 'firebase'

export const addRequest = (request) => dispatch => {
  const newRequestKey = database.ref().child('Requests').push().key;
  const time = firebase.database.ServerValue.TIMESTAMP

  request.date = time

  let updates = {};
  updates['/Requests/' + newRequestKey] = request

  return database.ref().update(updates)
}
