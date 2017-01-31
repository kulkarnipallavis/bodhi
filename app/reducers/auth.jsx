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


export const loggedIn = (user) => dispatch => {
  return database
    .ref('Users').child(user.uid)
    // .orderByChild('authUid')
    // .equalTo(user.uid)
	  .once('value', function(snapshot){
      if (!snapshot.val()) {
        const date = new Date
        const theDate = date.toString()

        database.ref(`Users/${user.uid}`).set({
          email: user.email,
          name: user.displayName,
          picture: '',
          dateJoined: theDate,
          badges: ''
        })
        const newUser = {
          authUid: user.uid,
          email: user.email,
          name: user.displayName,
          picture: '',
          dateJoined: theDate,
          badges: ''
        }
        dispatch({
          type: LOGGED_IN,
          user: newUser
        })
      } else {
        const newUser = {
          authUid: user.uid,
          email: user.email,
          name: snapshot.val().name,
          picture: snapshot.val().picture,
          dateJoined: snapshot.val().dateJoined,
          badges: snapshot.val().badges
        }

        dispatch({ type: LOGGED_IN, user: newUser })
      }
    })
}

export const loggedOut = () => ({ type: LOGGED_OUT })
