import { database } from '../firebase'


const GET_OFFERS_RECEIVED = 'GET_OFFERS_RECEIVED'

const reducer = (state = null, action) => {
  switch (action.type) {
    case GET_OFFERS_RECEIVED: return action.offers
    default: return state
  }
}

export default reducer


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
      if (snapshot.val()) {
      	const offUids = [];

      	for(let offer in snapshot.val()){
      		offUids.push(offer.offUid)
      	}

      	console.log("OFFUIDS", offUids)

      	//if there is an offer
        console.log('snapshot.val in IF ', snapshot.val())
        dispatch(getOffers(snapshot.val()))
      } else {
        console.log('ELSE')
      }
    })
}


const getHelpers = (users) => {
	type: GET_HELPERS,
	helpers: users
}

const findHelper = (offUid) => {
	return (dispatch) =>
		return database
		  .ref('Users').child(offUid)
			  .once('value', function(snapshot){
			  	const helper = {
			  		name: snapshot.val().name,
			  		picture: snapshot.val().picture
			  	}

			  }
}











