import firebase, { database } from '../firebase.jsx'

export const submitOffer = (newOffer) => {
  return dispatch => {
    var newOfferKey = firebase.database().ref().child('Offers').push().key;

    var updates = {['/Offers/' + newOfferKey]: newOffer}

    return firebase.database().ref().update(updates)
  }
}

export const respondToOffer = (status, offKey) => dispatch => {
  var statusUpdate = {[`Offers/${offKey}/status`]: status}

  return database.ref().update(statusUpdate)
}
