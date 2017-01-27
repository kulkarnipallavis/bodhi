

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

export const loggedIn = (user) => ({
  type: LOGGED_IN,
  user
})

export const loggedOut = () => ({
  type: LOGGED_OUT
})


