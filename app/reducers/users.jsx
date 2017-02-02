import firebase from '../firebase.jsx'

export const RECEIVE_USERS = 'RECEIVE_USERS'

const usersReducer = (users = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS: return action.users
    default: return users
  }
}

export const receiveUsers = (users) => ({ type: RECEIVE_USERS, users })

export const getAllUsers = () => dispatch => firebase.database().ref('Users')
  .on('value', snapshot => {
    let users = snapshot.val()
    dispatch(receiveUsers(users))
  })

export default usersReducer
