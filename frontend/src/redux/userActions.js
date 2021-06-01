import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from './userConstants'
import { setToStorage, removeFromStorage } from './helper/localStorage'
import { errorHandler } from './helper/errorHandler'
import { loginAPI, registerAPI, updateUserProfileAPI } from './userAPI'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const { data } = await loginAPI({ email, password })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    setToStorage('userInfo', data)
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: errorHandler(err),
    })
  }
}

export const logout = () => (dispatch) => {
  removeFromStorage('userInfo')

  dispatch({ type: USER_LOGOUT })
}

export const register = (user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const { data } = await registerAPI(user)

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    setToStorage('userInfo', data)
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: errorHandler(err),
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const { data } = await updateUserProfileAPI(user, userInfo.token)

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })

    setToStorage('userInfo', data)
  } catch (err) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: errorHandler(err),
    })
  }
}
