import firebase, { database } from '../firebase.jsx'


//LOAD OFFERS RECEIVED and put them on state??


export const submitOffer = (newOffer) => {
  return dispatch => {
    var newOfferKey = firebase.database().ref().child('Offers').push().key;
    // var offerData = {
    //  date: newOffer.date,
    //  messageToRequester: newOffer.message,
    //  offerId: newOfferKey
    // }

console.log('NEW OFFER ', newOffer)
    var updates = {['/Offers/' + newOfferKey]: newOffer}

    return firebase.database().ref().update(updates)
  }
}



