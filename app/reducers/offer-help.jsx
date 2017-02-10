import firebase from 'firebase'
import { database } from '../firebase.jsx'


export const submitOffer = (newOffer) => dispatch => {
  let newOfferKey = database.ref().child('Offers').push().key
  let time = firebase.database.ServerValue.TIMESTAMP
  let newOfferWithTime = {...newOffer, date: time }

  let updates = {[`/Offers/${newOfferKey}`]: newOfferWithTime }

  return database.ref().update(updates)
}

export const respondToOffer = (status, offKey) => dispatch => {

  let time
  if (status === 'accepted') {
    time = firebase.database.ServerValue.TIMESTAMP
  }

  var statusUpdate = {
    [`Offers/${offKey}/status`]: status,
    [`Offers/${offKey}/dateAccepted`]: status === "accepted" ? time : null
  }

  return database.ref().update(statusUpdate)
}
