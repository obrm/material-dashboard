import { alertConstants } from './alertConstants'
import { userConstants } from './userConstants'

export const alertReducer = (state = { isOpen: false }, action) => {
  const { type, payload } = action

  switch (type) {
    case alertConstants.USER_LOGIN_FAIL:
      return {
        title: 'Login Error',
        message: payload,
        isOpen: true,
      }
    case alertConstants.USER_REGISTER_FAIL:
      return {
        title: 'Registration Error',
        message: payload,
        isOpen: true,
      }
    case alertConstants.USER_UPDATE_PROFILE_FAIL:
      return {
        title: 'Profile update Error',
        message: payload,
        isOpen: true,
      }
    case userConstants.USER_UPDATE_PROFILE_SUCCESS:
      return {
        title: 'Profile update Success',
        message: 'Profile updated successfully',
        isOpen: true,
      }
    case alertConstants.ALERT_RESET:
      return {
        isOpen: false,
      }
    default:
      return state
  }
}
