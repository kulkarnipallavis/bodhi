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
    return database
      .ref('Users')
      .orderByChild('authUid')
      .equalTo(user.uid)
		  .once('value', function(snapshot){
   		console.log("snapshot", snapshot.val())

  		if(!snapshot.val()){
        const newUserKey = database.ref().child('Users').push().key
        const date = new Date
        const theDate = date.toString()
  			database.ref(`Users/${newUserKey}`).update({
          authUid: user.uid,
          email: user.email,
          name: user.displayName,
          picture: '',
          dateJoined: theDate,
          badges: ''
        })
        .then((result) => {
          console.log("result in IF", result)
            // dispatch({
            //   type: LOGGED_IN,
            //   user: result.val()
            // })
          })
        .catch(err => console.log(err))
  		} else {
  			console.log("User is in the database: snapshot.val(): ", snapshot.val())

        dispatch({
          type: LOGGED_IN,
          user: snapshot.val()
        })
  		}
  	})


  }
}



// export const loggedIn = (user) =>

export const loggedOut = () => ({
  type: LOGGED_OUT
})







