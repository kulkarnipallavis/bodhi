import firebase from '../firebase.jsx'

export const submitOffer = (newOffer) => {
	return dispatch => {
		var newOfferKey = firebase.database().ref().child('Offers').push().key;
		// var offerData = {
		// 	date: newOffer.date,
		// 	messageToRequester: newOffer.message,
		// 	offerId: newOfferKey
		// }

    var updates = {['/Offers/' + newOfferKey] : newOffer}
    return firebase.database().ref().update(updates)
	}
}
