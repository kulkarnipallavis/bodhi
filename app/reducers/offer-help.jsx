import firebase from '../firebase.jsx'

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


//LOAD OFFERS RECEIVED and put them on state??

// export const findOffers = (uid) => {
//   return database
//     .ref('Offers')
//     .orderByChild('reqUid')
//     .equalTo(uid)
//     .once('value', function(snapshot) {
//       if (snapshot.val()) {  //if there is an offer

//       }
//     })

//   }
// }
