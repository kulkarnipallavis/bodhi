'use strict'

//import { RECEIVE_REQUESTS } from './constants'
import { database } from '../firebase.jsx'
import firebase from 'firebase'

export const addRequest = (request) => dispatch => {
    const newRequestKey = database.ref().child('Requests').push().key;
    const date = new Date
    const theDate = date.toString()

    const time = firebase.database.ServerValue.TIMESTAMP

    request.date = time;

    // database.ref(`Users/${request.uid}/requests/${newRequestKey}`).set({ date: theDate })

    let updates = {};

    updates['/Users/' + request.uid + '/requests/requestId'] = newRequestKey;
    updates['/Requests/' + newRequestKey] = request;

    return database.ref().update(updates);
  }

