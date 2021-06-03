import { checkEmail } from './checkEmail'

export const validateInputs = (values) => {
  const errors = {}
  // eslint-disable-next-line
  for (const key of Object.keys(values)) {
    if (
      validators.checkString(values[key]) ||
      (key === 'email' && values[key] && validators.checkEmail(values[key]))
    ) {
      errors[key] = true
    } else {
      errors[key] = false
    }
  }
  return errors
}

const validators = {
  checkString: (val) => {
    return val.trim() === '' || val === null || val === undefined
  },
  checkEmail: (val) => {
    return checkEmail(val)
  },
}
