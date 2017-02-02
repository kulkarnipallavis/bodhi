import { database } from '../firebase.jsx'
import firebase from 'firebase'

//updateUser

let initialState = {

}

const reducer = (state = initialState, action) => {
	const newState = Object.assign({}, state);
	switch (action.type) {
		case UPDATE_USER:
			newState.currentUser = action.newUser
		case GET_USER:
			newState.currentUser = action.currentUser;
			break;
		default:
			return state;
	}
	return newState;
};

export const updateUser = (userId, state) => {
	const valueKeys = Object.keys(state)
    
	valueKeys.forEach(value => {
		database.ref('Users/' + userId).update({
			[value] : state[value]
		})
	})
}
