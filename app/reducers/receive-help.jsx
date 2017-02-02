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


const findHelper = (offer) => {
  return database
    .ref('Users')
    .child(offer.offUid)
    .once('value').then(function(snapshot){
      offer.offUser = {
        name: snapshot.val().name,
        picture: snapshot.val().picture,
        phone: snapshot.val().phone
      }
      return offer
    })
}


export const findOffers = (uid) => {
  return (dispatch) =>
  database
    .ref('Offers')
    .orderByChild('reqUid')
    .equalTo(uid)
    .once('value', function(snapshot) {

      let offers = [];
      if (snapshot.val()) {   //if there is an offer

         for(let offer in snapshot.val()){
          const offerObj = snapshot.val()[offer];
          offerObj.offKey = offer;
          offers.push(offerObj)
         }

         const addingUsers = offers.map(findHelper)

         Promise.all(addingUsers)
         .then(offers => dispatch(getOffers(offers)))

      }
    })
}


const getHelpers = (users) => ({
  type: GET_HELPERS,
  helpers: users
})












