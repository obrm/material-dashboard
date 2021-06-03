import { ALERT_RESET } from '../alertConstants'
import { logout } from '../userActions'

export const alertReset = (dispatch) => {
  return setTimeout(() => {
    dispatch(logout())
    dispatch({ type: ALERT_RESET })
  }, 3000)
}
