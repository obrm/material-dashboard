import { alertConstants } from './alertConstants'
import { userConstants } from './userConstants'
import { setToStorage, removeFromStorage } from './helper/localStorage'
import { errorHandler } from './helper/errorHandler'
import { alertReset } from './helper/alertReset'
import { loginAPI, registerAPI, updateUserProfileAPI } from './userAPI'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: userConstants.USER_LOGIN_REQUEST,
    })

    const { data } = await loginAPI({ email, password })

    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: data,
    })

    setToStorage('userInfo', data)
  } catch (err) {
    dispatch({
      type: alertConstants.USER_LOGIN_FAIL,
      payload: errorHandler(err),
    })
    alertReset(dispatch)
  }
}

export const logout = () => (dispatch) => {
  removeFromStorage('userInfo')

  dispatch({ type: userConstants.USER_LOGOUT })
}

export const register = (user) => async (dispatch) => {
  try {
    dispatch({
      type: userConstants.USER_REGISTER_REQUEST,
    })

    const { data } = await registerAPI(user)

    dispatch({
      type: userConstants.USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: data,
    })

    setToStorage('userInfo', data)
  } catch (err) {
    dispatch({
      type: alertConstants.USER_REGISTER_FAIL,
      payload: errorHandler(err),
    })
    alertReset(dispatch)
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const { data } = await updateUserProfileAPI(user, userInfo.token)

    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: data,
    })

    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })

    setToStorage('userInfo', data)

    setTimeout(() => {
      dispatch({ type: alertConstants.ALERT_RESET })
    }, 3000)
  } catch (err) {
    dispatch({
      type: alertConstants.USER_UPDATE_PROFILE_FAIL,
      payload: errorHandler(err),
    })
    setTimeout(() => {
      dispatch({ type: alertConstants.ALERT_RESET })
    }, 3000)
  }
}
