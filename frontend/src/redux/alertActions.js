import { alertConstants } from './alertConstants'

export const showAlert = (title, message, delay = 3000) => (dispatch) => {
  dispatch({
    type: alertConstants.CUSTOM_ALERT,
    payload: { title, message },
  })

  setTimeout(() => {
    dispatch({ type: alertConstants.ALERT_RESET })
  }, delay)
}
