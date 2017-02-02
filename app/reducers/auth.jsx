import { database } from '../firebase'

const LOGGED_IN = 'LOGGED_IN'
const LOGGED_OUT = 'LOGGED_OUT'
const UPDATE_USER = 'UPDATE_USER'
const GET_USER = 'GET_USER'

const reducer = (state = null, action) => {
  switch (action.type) {
    case LOGGED_IN: return action.user
    case UPDATE_USER: return action.updatedUser
    case GET_USER: return action.currentUser
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

export const sendUser = (currentUser) => {
  dispatch({type: GET_USER, currentUser})
}

export const updateUser = (updatedUser) => {
  dispatch({type: UPDATE_USER, updatedUser})
}

export const updateUserInDatabase = (userId, state) => {
  const valueKeys = Object.keys(state)

  valueKeys.forEach(value => {
    database.ref('Users/' + userId).update({
      [value] : state[value]
    })
  })
}

export const loggedOut = () => ({ type: LOGGED_OUT })
