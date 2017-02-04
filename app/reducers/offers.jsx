import { database } from '../firebase.jsx'
import firebase from 'firebase'

// _______________ CONSTANTS _______________ //

export const RECEIVE_HELPERS = 'RECEIVE_HELPERS'
export const RECEIVE_OFFERS = 'RECEIVE_OFFERS'

// _______________ REDUCER _______________ //

const offersReducer = (offers = [], action) => {
  switch (action.type) {
    case RECEIVE_OFFERS: return action.offers
    default: return offers
  }
}

export default offersReducer

// _______________ ACTION CREATORS _______________ //

export const receiveOffers = (offers) => ({ type: RECEIVE_OFFERS, offers })

// _______________ THUNKS _______________ //

export const submitOffer = newOffer => dispatch => {
  const newOfferKey = database().ref().child('Offers').push().key
  const updates = {['/Offers/' + newOfferKey]: newOffer}

  return database().ref().update(updates)
}

export const respondToOffer = (status, offKey) => dispatch => {
  let statusUpdate = {}
  statusUpdate[`Offers/${offKey}/status`] = status

  return database.ref().update(statusUpdate)
}

export const getAllOffers = () => dispatch => firebase.database()
  .ref('Offers')
  .orderByChild('reqUid')
  .once('value', function(snapshot) {
    let offers = []
    let offersObject = snapshot.val()
    if (snapshot.val()) { //if offer(s)
      for (var offerKey in offersObject) {
        if (offersObject[offerKey].status !== 'declined') {
          const offer = offersObject[offerKey]
          offer.offKey = offerKey
          offers.push(offer)
        }
      }
      // users & requests, also on state, will be added to offers for feed
      dispatch(receiveOffers(offers))
    }
  })
