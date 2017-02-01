import { database } from '../firebase.jsx'
import firebase from 'firebase'

//updateUser

export const updateUser = (userId, state) => {
	const valueKeys = Object.keys(state)
    
	valueKeys.forEach(value => {
		database.ref('Users/' + userId).update({
			[value] : state[value]
		})
	})
}
