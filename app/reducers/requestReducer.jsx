'use strict'

//import { RECEIVE_REQUESTS } from './constants'
import firebase from '../firebase.jsx'


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


export const addRequest = (request) =>(
	dispatch =>{
		var newRequestKey = database.ref().child('Requests').push().key;

		var updates = {};
		updates['/Users/' + uid + '/requests/requestId'] = newRequestKey;
		updates['/Requests/' + newRequestKey] = request;

		return database.ref().update(updates);
	}


)
//export default requestReducer
