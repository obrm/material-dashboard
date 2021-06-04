import { alertConstants } from './alertConstants'
import { alertReset } from './helper/alertReset'

export const showAlert = (title, message) => (dispatch) => {
  dispatch({
    type: alertConstants.CUSTOM_ALERT,
    payload: { title, message },
  })

  alertReset(dispatch, 5000)
}
