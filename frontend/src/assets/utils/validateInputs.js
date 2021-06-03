import { checkEmail } from './checkEmail'

export const validateInputs = (values) => {
  let errors = {}
  let status = false
  // eslint-disable-next-line
  for (const key of Object.keys(values)) {
    if (
      validators.checkString(values[key]) ||
      (key === 'email' && values[key] && validators.checkEmail(values[key]))
    ) {
      errors[key] = true
      status = true
    } else {
      errors[key] = false
      status = false
    }
  }
  return {
    errors,
    status,
  }
}

const validators = {
  checkString: (val) => {
    return val.trim() === '' || val === null || val === undefined
  },
  checkEmail: (val) => {
    return checkEmail(val)
  },
}
