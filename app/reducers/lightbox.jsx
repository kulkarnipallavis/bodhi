
const SHOW_LB = 'SHOW_LB'

const reducer = (state = null, action) => {
  switch (action.type) {
    case SHOW_LB: return action.bool
    default: return ''
  }
}

export default reducer

export const showLB = (bool) => ({
  type: SHOW_LB,
  bool
})
