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
      	let offUids = [];

      	for(let offer in snapshot.val()){
      		offUids.push(snapshot.val()[offer].offUid)
      	}


      	// findHelper(offUids[0]).then(helper => {
      	// 	console.log("HELPER CALLED", helper)
      	// })
      	//console.log("HELPER", findHelper(offUids[0]))

      	//if there is an offer

      	let offers = [];

				 for(let offer in snapshot.val()){
				 	const offerObj = snapshot.val()[offer];
				 	findHelper(offerObj.offUid).then(helper => {
				 		offerObj.offUser = helper
				 	})
				 	offerObj.offKey = offer;
				 	offers.push(offerObj)
				 }
				 console.log("OFFERS", offers)
        //console.log('snapshot.val in IF ', snapshot.val())
        dispatch(getOffers(offers))
      } else {
        console.log('ELSE')
      }
    })
}


const getHelpers = (users) => ({
	type: GET_HELPERS,
	helpers: users
})

const findHelper = (offUid) => {
	// return (dispatch) =>{

		// let helper = {}; 
 // const findingHelper = () => {
		return database
	  .ref('Users')
	  .child(offUid)
	  .once('value').then(function(snapshot){
	  	let helper = {
	  		name: snapshot.val().name,
	  		picture: snapshot.val().picture
	  	}
	  	return helper
	  })
	  //.then((helper) => helper.data)
	 // }
 // }

 // return findingHelper()
 // .then(helper => helper)

}











