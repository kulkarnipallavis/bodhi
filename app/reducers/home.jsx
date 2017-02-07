import firebase from '../firebase.jsx';

const initialState = {
	openRequests: [],
	acceptedOffers: []
}

const OPEN_REQUESTS = 'OPEN_REQUESTS';
const ACCEPTED_OFFERS = 'ACCEPTED_OFFERS';

const reducer = (state = initialState, action) => {
	const newState = Object.assign({}, state);
	switch (action.type) {
		case OPEN_REQUESTS:
			newState.openRequests = action.openRequests;
			break;
		case ACCEPTED_OFFERS:
			newState.acceptedOffers = action.acceptedOffers;
			break;
		default:
			return state;
	}
	return newState;
}

const setOpenRequests = (openRequests) => ({
	type: OPEN_REQUESTS,
	openRequests
})

export const getOpenRequests = () =>
	dispatch => {
		const ref = firebase.database().ref('Requests')
		ref.orderByChild('status').equalTo('open')
			.on('value', snapshot => {
				const openRequests = snapshot.val()
				dispatch(setOpenRequests(openRequests))
			})

};

const setAcceptedOffers = (acceptedOffers) => ({
	type: ACCEPTED_OFFERS,
	acceptedOffers
})

// getUser(userId : userId) ~> User
const getUser = (userId) => {
	return firebase.database().ref('Users')
					.child(userId)
					.once('value')
					.then(snapshot => {
						return snapshot.val()
					})					
}

// getOfferWithUsers(offer: Offer) ~> [withOfferrer: OfferWithUser, withRequester: OfferWithUser]
const getOfferWithUsers = (offer) => {
	let newOffer = Object.assign({}, offer)
	return Promise.all([getUser(offer.offUid),
					getUser(offer.reqUid)
				])
				.then((users) => {
					// console.log("offer", users[0])
					const dateDiff = Math.round(((new Date()).getTime() - offer.dateAccepted)/(24*60*60*1000))
					// console.log("dateDiff", dateDiff)
					let date = ''
					if(dateDiff === 0){
						date ='Today'
					} 
					else if (isNaN(dateDiff)) {
						date = ''
					}
					else {
						date = dateDiff.toString().concat('d')
					}
					// console.log("date", date)
					// console.log(offer.dateAccepted)

					newOffer.offUser = {
						name : users[0].name,
						picture: users[0].picture,
						date:  date
					}
					// console.log("offer", users[1])
					newOffer.reqUser = {
						name : users[1].name,
						picture: users[1].picture
					}
					return newOffer
				})
}

export const getAcceptedOffers = () =>
	dispatch => {
		const ref = firebase.database().ref('Offers')
		ref.orderByChild('status').equalTo('accepted')
			.on('value', (snapshot) => {
				let offers = []
				for(let key in snapshot.val()){
					offers.push(snapshot.val()[key])
				}
				
				// mappedOffers: [...[OfferWithUser, OfferWithUser]]
				const offersWithUsers = offers.map(getOfferWithUsers)
				// const mappedOffers = offers.map(getAll)
				// console.log("offersWithUsers....", offersWithUsers)
				Promise.all(offersWithUsers)
						.then((offUsers)=>{
							console.log("offUsers.....",offUsers)
						    dispatch(setAcceptedOffers(offUsers))
						})
			})
	}


export default reducer;
