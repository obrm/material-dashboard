import { userConstants } from './userConstants'
import { alertConstants } from './alertConstants'

export const userReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case userConstants.USER_REQUEST:
      return { ...state, loading: true }
    case userConstants.USER_SUCCESS:
      return { loading: false, userInfo: payload }
    case alertConstants.USER_FAIL:
      return { ...state, loading: false }
    case userConstants.USER_LOGOUT:
      return {}
    default:
      return state
  }
}
