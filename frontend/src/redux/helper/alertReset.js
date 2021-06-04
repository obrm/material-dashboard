import { alertConstants } from '../alertConstants'
import { logout } from '../userActions'

export const alertReset = (dispatch, delay = 3000) => {
  return setTimeout(() => {
    dispatch(logout())
    dispatch({ type: alertConstants.ALERT_RESET })
  }, delay)
}
