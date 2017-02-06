import { database } from '../firebase.jsx'
import firebase from 'firebase'

export const submitOffer = (newOffer) => dispatch => {
  var newOfferKey = database.ref().child('Offers').push().key
  var updates = {[`/Offers/${newOfferKey}`]: newOffer}

  return database.ref().update(updates)
}

export const respondToOffer = (status, offKey) => dispatch => {

  let time
  if (status === 'accepted') {
    time = firebase.database.ServerValue.TIMESTAMP
  }

  var statusUpdate = {
    [`Offers/${offKey}/status`]: status,
    [`Offers/${offKey}/dateAccepted`]: time
  }

  return database.ref().update(statusUpdate)
}
