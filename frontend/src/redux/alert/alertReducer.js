import { alertConstants } from './alertConstants'

export const alertReducer = (
  state = { title: 'Error', isOpen: false },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case alertConstants.USER_FAIL:
      return { ...state, message: payload, isOpen: true }
    case alertConstants.USER_UPDATE_PROFILE_SUCCESS:
      return {
        title: 'Profile update Success',
        message: 'Profile updated successfully',
        isOpen: true,
      }
    case alertConstants.CUSTOM_ALERT:
      return {
        title: payload.title,
        message: payload.message,
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
