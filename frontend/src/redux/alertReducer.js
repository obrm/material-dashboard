import {
  USER_LOGIN_FAIL,
  USER_REGISTER_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  ALERT_RESET,
} from './alertConstants'
import { USER_UPDATE_PROFILE_SUCCESS } from './userConstants'

export const alertReducer = (state = { isOpen: false }, action) => {
  const { type, payload } = action

  switch (type) {
    case USER_LOGIN_FAIL:
      return {
        title: 'Login Error',
        message: payload,
        isOpen: true,
      }
    case USER_REGISTER_FAIL:
      return {
        title: 'Registration Error',
        message: payload,
        isOpen: true,
      }
    case USER_UPDATE_PROFILE_FAIL:
      return {
        title: 'Profile update Error',
        message: payload,
        isOpen: true,
      }
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        title: 'Profile update Success',
        message: 'Profile updated successfully',
        isOpen: true,
      }
    case ALERT_RESET:
      return {
        isOpen: false,
      }
    default:
      return state
  }
}
