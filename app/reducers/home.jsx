import firebase from '../firebase.jsx';

const initialState = {
	openRequests: [],
	closedRequests: []
};

const OPEN_REQUESTS = 'OPEN_REQUESTS';
const CLOSED_REQUESTS = 'CLOSED_REQUESTS';

const reducer = (state = initialState, action) => {
	const newState = Object.assign({}, state);
	switch (action.type) {
		case OPEN_REQUESTS:
			newState.openRequests = action.openRequests;
			break;
		case CLOSED_REQUESTS:
			newState.closedRequests = action.closedRequests;
			break;
	}
	return newState;
};

const setOpenRequests = (openRequests) => ({
	type: OPEN_REQUESTS,
	openRequests
});

export const getOpenRequests = () =>
	dispatch => {
		const ref = firebase.database().ref('Requests');
		ref.orderByChild('status').equalTo('open')
			.on('value', snapshot => {
				const openRequests = snapshot.val();
				dispatch(setOpenRequests(openRequests));
			});

};

const setClosedRequests = (closedRequests) => ({
	type: CLOSED_REQUESTS,
	closedRequests
});

export const getClosedRequests = () =>
	dispatch => {
		const ref = firebase.database().ref('Requests');
		ref.orderByChild('status').equalTo('closed')
			.on('value', snapshot => {
				const closedRequests = snapshot.val();
				dispatch(setClosedRequests(closedRequests));
			});
};

export default reducer;
