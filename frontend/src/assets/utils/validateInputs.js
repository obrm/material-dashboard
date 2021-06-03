import { checkEmail } from './checkEmail'

export const validateInputs = (values) => {
  const errors = {}
  let valid = true
  // eslint-disable-next-line
  for (const key of Object.keys(values)) {
    if (
      validators.checkString(values[key]) ||
      (key === 'email' && values[key] && validators.checkEmail(values[key]))
    ) {
      errors[key] = true
      valid = false
    } else {
      errors[key] = false
      valid = true
    }
  }
  return {
    errors,
    valid,
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
