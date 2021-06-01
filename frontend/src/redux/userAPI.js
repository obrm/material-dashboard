import { axiosPut, axiosPost } from './helper/axios'
import { LOGIN_URL, REGISTER_URL, UPDATE_PROFILE_URL } from './userConstants'

export const loginAPI = (userData) => axiosPost(LOGIN_URL, userData)

export const registerAPI = (userData) => axiosPost(REGISTER_URL, userData)

export const updateUserProfileAPI = (user, token) =>
  axiosPut(UPDATE_PROFILE_URL, user, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
