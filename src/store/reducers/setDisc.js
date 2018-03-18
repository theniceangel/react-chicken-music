import * as TYPES from 'src/store/action-types'

export const setDisc = function (state = {}, action) {
  if (action.type === TYPES.SET_DISC) {
    state = action.disc
  }
  return state
}
