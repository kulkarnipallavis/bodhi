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
				const dateDiff = Math.round(((new Date()).getTime() - offer.dateAccepted)/(24*60*60*1000))
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
				newOffer.offUser = {
					name : users[0].name,
					picture: users[0].picture,
					date:  date
				}
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
				
				const offersWithUsers = offers.map(getOfferWithUsers)
				Promise.all(offersWithUsers)
						.then((offUsers)=>{
						    dispatch(setAcceptedOffers(offUsers))
						})
			})
	}

const getRequestWithUser = (request) => {
	let newRequest = Object.assign({}, request)

	return getUser(request.uid)
		.then(user => {
			const dateDiff = Math.round(((new Date()).getTime() - request.date)/(24*60*60*1000))
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

			newRequest.user = {
				name: user.name,
				picture: user.picture,
				date: date
			}
			return newRequest
		})
}

export const getOpenRequests = () => 
	dispatch => {
		const ref = firebase.database().ref('Requests')
		ref.orderByChild('status').equalTo('open')
			.on('value', (snapshot) => {
				let requests = []
				for(let key in snapshot.val()){
					requests.push(snapshot.val()[key])
				}

				const requestsWithUser = requests.map(getRequestWithUser)

				Promise.all(requestsWithUser)
					.then(reqUsers => {
						dispatch(setOpenRequests(reqUsers))
					})
			})
	}

export default reducer;
