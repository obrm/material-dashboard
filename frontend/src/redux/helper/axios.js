import axios from 'axios'

export const axiosPost = (
  url,
  body,
  config = { headers: { 'Content-Type': 'application/json' } }
) => axios.post(url, body, config)

export const axiosPut = (url, body, config) => axios.put(url, body, config)
