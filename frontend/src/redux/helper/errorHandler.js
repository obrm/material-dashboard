const parseErrorResponse = (error) => {
  let message = ''
  // eslint-disable-next-line
  for (const obj of error) {
    message += `${obj.msg}. `
  }
  return message
}

export const errorHandler = (error) => {
  return error.response.data.errors
    ? parseErrorResponse(error.response.data.errors)
    : error.response && error.response.data.message
    ? error.response.data.message
    : error.message
}
