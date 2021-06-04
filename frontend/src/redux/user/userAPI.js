import { axiosPut, axiosPost } from '../helper/axios'
import { userUrls } from './userConstants'

export const loginAPI = (userData) => axiosPost(userUrls.LOGIN_URL, userData)

export const registerAPI = (userData) =>
  axiosPost(userUrls.REGISTER_URL, userData)

export const updateUserProfileAPI = (user, token) =>
  axiosPut(userUrls.UPDATE_PROFILE_URL, user, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
