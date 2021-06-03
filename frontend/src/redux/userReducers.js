import { userConstants } from './userConstants'
import { alertConstants } from './alertConstants'

export const userLoginReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case userConstants.USER_LOGIN_REQUEST:
      return { loading: true }
    case userConstants.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: payload }
    case alertConstants.USER_LOGIN_FAIL:
      return { loading: false }
    case userConstants.USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case userConstants.USER_REGISTER_REQUEST:
      return { loading: true }
    case userConstants.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: payload }
    case alertConstants.USER_REGISTER_FAIL:
      return { loading: false }
    case userConstants.USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case userConstants.USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case userConstants.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, userInfo: payload }
    case alertConstants.USER_UPDATE_PROFILE_FAIL:
      return { loading: false }
    case userConstants.USER_LOGOUT:
      return {}
    case userConstants.USER_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}
