import { database } from '../firebase'

export const RECEIVE_USER_PROFILE_INFO = 'RECEIVE_USER_PROFILE_INFO'

const profileUserReducer = (profileUser = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER_PROFILE_INFO: return action.user
    default: return profileUser
  }
}

export default profileUserReducer

export const receiveUserProfileInfo = (user) => ({
  type: RECEIVE_USER_PROFILE_INFO,
  user
})

export const grabUserProfileInfo = (key) => {
  return dispatch => database
  .ref('Users')
  .child(key)
  .once('value')
  .then(snapshot => {
    if (snapshot.val()) { //if there is a user
      const user = snapshot.val()
      user.uid = key
      dispatch(receiveUserProfileInfo(user))
    }
  })
}
