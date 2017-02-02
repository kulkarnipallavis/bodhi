import { database } from '../firebase.jsx'
import firebase from 'firebase'

export const submitOffer = (newOffer) => {
  return dispatch => {
    const newOfferKey = database().ref().child('Offers').push().key;
    const updates = {[`/Offers/${newOfferKey}`]: newOffer}
    return database().ref().update(updates)
  }
}
