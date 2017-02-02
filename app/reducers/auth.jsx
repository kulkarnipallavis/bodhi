import { database } from '../firebase'

const LOGGED_IN = 'LOGGED_IN'
const LOGGED_OUT = 'LOGGED_OUT'
const UPDATE_USER = 'GET_USER'

const reducer = (state = null, action) => {
  switch (action.type) {
    case LOGGED_IN: return action.user
    case UPDATE_USER: return action.updatedUser
    case LOGGED_OUT: return null
    default: return state
  }
}


export default reducer

export const loggedIn = (user) => {
  return dispatch => {
    return database
      .ref('Users').child(user.uid)
      .once('value', function(snapshot){

      if(!snapshot.val()){
        const date = new Date
        const theDate = date.toString()

        database.ref(`Users/${user.uid}`).set({
          email: user.email,
          name: user.displayName,
          picture: '',
          dateJoined: theDate,
          badges: '',
          phone: ''
        })
        const newUser = {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          picture: '',
          dateJoined: theDate,
          badges: '',
          phone: ''
        }
        dispatch({
          type: LOGGED_IN,
          user: newUser
        })
      } else {
          const newUser = {
            uid: user.uid,
            email: user.email,
            name: snapshot.val().name,
            picture: snapshot.val().picture,
            dateJoined: snapshot.val().dateJoined,
            badges: snapshot.val().badges,
            phone: snapshot.val().phone
          }
        dispatch({
          type: LOGGED_IN,
          user: newUser
        })
  		}
  	})
  }
}

export const updateUser = updatedUser => dispatch => {

  dispatch({type: UPDATE_USER, updatedUser})

  console.log("updatedUser", updatedUser)

  const updates = {
    badges: updatedUser.badges,
    dateJoined: updatedUser.dateJoined,
    email: updatedUser.email,
    name: updatedUser.name,
    phone: updatedUser.phone,
    picture: updatedUser.picture       
  }

  database.ref('Users').child(updatedUser.uid)
    .update(updates)

}


export const loggedOut = () => ({
  type: LOGGED_OUT
})




