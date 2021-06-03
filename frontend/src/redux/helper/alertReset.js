import { alertConstants } from '../alertConstants'
import { logout } from '../userActions'

export const alertReset = (dispatch) => {
  return setTimeout(() => {
    dispatch(logout())
    dispatch({ type: alertConstants.ALERT_RESET })
  }, 3000)
}
