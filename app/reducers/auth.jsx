import { database } from '../firebase'

const LOGGED_IN = 'LOGGED_IN'
export const LOGGED_OUT = 'LOGGED_OUT'
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

      if (!snapshot.val()){
        const date = new Date
        const theDate = date.toString()

        database.ref(`Users/${user.uid}`).set({
          email: user.email,
          name: user.displayName,
          picture: '',
          dateJoined: theDate,
          badges: '', // badges === karma
          skills: '',
          phone: '',
          bio: ''
        })
        const newUser = {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          picture: `http://api.adorable.io/avatar/${user.uid}`,
          dateJoined: theDate,
          badges: '',
          skills: '',
          phone: '',
          bio: ''
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
            skills: snapshot.val().tags || '',
            phone: snapshot.val().phone,
            bio: snapshot.val().bio || ''
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

  dispatch({ type: UPDATE_USER, updatedUser })

  const updates = {
    badges: updatedUser.badges,
    skills: updatedUser.skills,
    bio: updatedUser.bio,
    dateJoined: updatedUser.dateJoined,
    email: updatedUser.email,
    name: updatedUser.name,
    phone: updatedUser.phone,
    picture: updatedUser.picture
  }

  database.ref('Users')
  .child(updatedUser.uid)
  .update(updates)

}

export const loggedOut = () => ({
  type: LOGGED_OUT
})
