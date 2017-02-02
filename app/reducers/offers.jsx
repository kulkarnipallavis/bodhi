import { database } from '../firebase.jsx'
import firebase from 'firebase'

// _______________ CONSTANTS _______________ //

export const RECEIVE_HELPERS = 'RECEIVE_HELPERS'
export const RECEIVE_HELP_OFFERED = 'RECEIVE_HELP_OFFERED'

// _______________ REDUCER _______________ //

const offersReducer = (offers = [], action) => {
  switch (action.type) {
    case RECEIVE_HELP_OFFERED: return action.offers
    default: return offers
  }
}

export default offersReducer

// _______________ ACTION CREATORS _______________ //

export const receiveHelpOffered = (offers) => ({ type: RECEIVE_HELP_OFFERED, offers })

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


export const getUserOffers = uid => dispatch => {
    database
    .ref('Offers')
    .orderByChild('reqUid')
    .equalTo(uid)
    .once('value', function(snapshot) {
      let offers = [];
      if (snapshot.val()) { //if offer(s)
        for (var offer in snapshot.val()) {
          if (offer.status !== 'declined') {
            const offerObj = snapshot.val()[offer]
            offerObj.offKey = offer
            offers.push(offerObj)
            // users are on state and will be added to offer
            // inside of AllOffers render func
          }
        }

        dispatch(receiveHelpOffered(offers))
      }
    })
}
