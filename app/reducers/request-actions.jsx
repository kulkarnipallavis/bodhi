'use strict'

//import { RECEIVE_REQUESTS } from './constants'
import { database } from '../firebase.jsx'

export const addRequest = (request) => dispatch => {
    const newRequestKey = database.ref().child('Requests').push().key;

    let updates = {};
    updates['/Users/' + request.uid + '/requests/requestId'] = newRequestKey;
    updates['/Requests/' + newRequestKey] = request;

    return database.ref().update(updates);
  }
