'use strict'

//import { RECEIVE_REQUESTS } from './constants'
import { database } from '../firebase.jsx'
import firebase from 'firebase'


// const requestReducer = (requests = [], action) => {
//   switch (action.type) {
//     case RECEIVE_REQUESTS:
//     	return action.requests

//     default: return requests
//   }
// }


// export const receiveRequests = (requests) => ({
//   type: RECEIVE_REQUESTS,
//   requests
// })


export const addRequest = (request) =>  {
  return dispatch => {
    const newRequestKey = database.ref().child('Requests').push().key;
    const date = new Date
    const theDate = date.toString()

    const time = firebase.database.ServerValue.TIMESTAMP

    request.date = time;

    // database.ref(`Users/${request.uid}/requests/${newRequestKey}`).set({ date: theDate })

    let updates = {};
    updates['/Requests/' + newRequestKey] = request

    return database.ref().update(updates);
  }
}
//export default requestReducer



