import { alertConstants } from '../alert/alertConstants'
import { userConstants } from './userConstants'
import { setToStorage, removeFromStorage } from '../helper/localStorage'
import { errorHandler } from '../helper/errorHandler'
import { loginAPI, registerAPI, updateUserProfileAPI } from './userAPI'

export const userAuth = (params, type) => async (dispatch) => {
  try {
    dispatch({
      type: userConstants.USER_REQUEST,
    })

    let payload

    if (type === 'login') {
      const { data } = await loginAPI(params)
      payload = data
    } else if (type === 'register') {
      const { data } = await registerAPI(params)
      payload = data
    }

    dispatch({
      type: userConstants.USER_SUCCESS,
      payload,
    })

    setToStorage('userInfo', payload)
  } catch (err) {
    dispatch({
      type: alertConstants.USER_FAIL,
      payload: errorHandler(err),
    })
    const delay = type === 'register' ? 5000 : 3000
    setTimeout(() => {
      dispatch(logout())
      dispatch({ type: alertConstants.ALERT_RESET })
    }, delay)
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userConstants.USER_REQUEST,
    })

    const {
      user: { userInfo },
    } = getState()

    const { data } = await updateUserProfileAPI(user, userInfo.token)

    dispatch({
      type: userConstants.USER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: alertConstants.USER_UPDATE_PROFILE_SUCCESS,
    })

    setToStorage('userInfo', data)

    setTimeout(() => {
      dispatch({ type: alertConstants.ALERT_RESET })
    }, 3000)
  } catch (err) {
    dispatch({
      type: alertConstants.USER_FAIL,
      payload: errorHandler(err),
    })
    setTimeout(() => {
      dispatch({ type: alertConstants.ALERT_RESET })
    }, 3000)
  }
}

export const logout = () => (dispatch) => {
  removeFromStorage('userInfo')

  dispatch({ type: userConstants.USER_LOGOUT })
}
