import firebase, { database } from '../firebase.jsx'


const GET_OFFERS_RECEIVED = 'GET_OFFERS_RECEIVED'

const reducer = (state = null, action) => {
  switch (action.type) {
    case GET_OFFERS_RECEIVED: return action.offers
    default: return null
  }
}

export default reducer

//LOAD OFFERS RECEIVED and put them on state??

const getOffers = (offers) => ({
  type: GET_OFFERS_RECEIVED,
  offers
})

export const findOffers = (uid) => {
  return (dispatch) =>
  database
    .ref('Offers')
    .orderByChild('reqUid')
    .equalTo(uid)
    .once('value', function(snapshot) {
      if (snapshot.val()) {  //if there is an offer
        console.log('snapshot.val in IF ', snapshot.val())
        dispatch(getOffers(snapshot.val()))
      } else {
        console.log('ELSE')
      }
    })
}


export const submitOffer = (newOffer) => {
  return dispatch => {
    var newOfferKey = firebase.database().ref().child('Offers').push().key;
    // var offerData = {
    //  date: newOffer.date,
    //  messageToRequester: newOffer.message,
    //  offerId: newOfferKey
    // }

    var updates = {['/Offers/' + newOfferKey] : newOffer}
    return firebase.database().ref().update(updates)
  }
}



