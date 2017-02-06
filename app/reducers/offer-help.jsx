import firebase, { database } from '../firebase.jsx'
import firebase1 from 'firebase'

export const submitOffer = (newOffer) => dispatch => {
  var newOfferKey = firebase.database().ref().child('Offers').push().key
  var updates = {[`/Offers/${newOfferKey}`]: newOffer}

  return firebase.database().ref().update(updates)
}

export const respondToOffer = (status, offKey) => dispatch => {

  let time
  if (status === 'accepted') {
    time = firebase1.database.ServerValue.TIMESTAMP
  }

  var statusUpdate = {
    [`Offers/${offKey}/status`]: status,
    [`Offers/${offKey}/dateAccepted`]: time
  }

  return database.ref().update(statusUpdate)
}
