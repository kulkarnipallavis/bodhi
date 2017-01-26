import firebase from '../firebase.jsx'

export const submitOffer = (date, msg) => {
	return dispatch => {
		var newOfferKey = firebase.database().ref().child('Offers').push().key;
		console.log("newOfferKey:", newOfferKey);
		var offerData = {
			date : date,
			messageToRequester : msg,
			offerId : newOfferKey
		}
	    var updates = {};
	  	updates['/Offers/' + newOfferKey] = offerData;
	  	return firebase.database().ref().update(updates);
	}
}
