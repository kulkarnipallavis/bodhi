import { database } from '../firebase'
import LOGGED_OUT from './auth'


const GET_OFFERS_RECEIVED = 'GET_OFFERS_RECEIVED'

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_OFFERS_RECEIVED: return action.offers
    case LOGGED_OUT: return []
    default: return state
  }
}

export default reducer


export const getOffers = (offers) => ({
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
  return (dispatch) => {
  const ref = database
    .ref('Offers')
    .orderByChild('reqUid')
    .equalTo(uid)

  const listener = ref
    .on('value', function(snapshot) {

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
    return () => ref.off('value', listener)
  }
}


const getHelpers = (users) => ({
  type: GET_HELPERS,
  helpers: users
})












