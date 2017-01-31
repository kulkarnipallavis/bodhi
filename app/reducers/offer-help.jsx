import firebase from '../firebase.jsx'

export const submitOffer = (newOffer) => dispatch => {
	const newOfferKey = firebase.database().ref().child('Offers').push().key;
	const offerData = {
		date: newOffer.date,
		messageToRequester: newOffer.message,
		offerId: newOfferKey
	}
  const updates = {['/Offers/' + newOfferKey]: offerData}
  return firebase.database().ref().update(updates)
}
