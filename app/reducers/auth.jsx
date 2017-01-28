import { database } from '../firebase'

const LOGGED_IN = 'LOGGED_IN'
const LOGGED_OUT = 'LOGGED_OUT'

const reducer = (state = null, action) => {
  switch (action.type) {
    case LOGGED_IN: return action.user
    case LOGGED_OUT: return null
    default: return state
  }
}

export default reducer

export const loggedIn = (user) => {
  return dispatch => {
  	//return database.ref('/Users' + user.uid).once('value').then(function(snapshot){
	return database
		.ref('/Users/-KbMhCodpMcAMlVjBQG-')
		.once('value', function(snapshot){
  		console.log("snapshot", snapshot.val())
  		// if(!snapshot){
  		// 	return database().ref('Users' + user.uid).set({
  		// 		uid: uid
  		// 	})
  		// } else {
  		// 	console.log("User is in the database: snapshot", snapshot)
  		// }
  		// return
  	})
  	// .then((user) => ({
  	// 	type: LOGGED_IN,
  	// 	user
 // 	})
  }
}



// export const loggedIn = (user) => 

export const loggedOut = () => ({
  type: LOGGED_OUT
})







