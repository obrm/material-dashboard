import Validators from './Validators'
import { showAlert } from '../../redux/alert/alertActions'

export const validateInputs = (values) => {
  const errors = {}
  // eslint-disable-next-line
  for (const key of Object.keys(values)) {
    if (
      validators.checkString(values[key]) ||
      (key === 'email' && values[key] && validators.checkEmail(values[key])) ||
      (key === 'password' &&
        values[key] &&
        validators.checkPassword(values[key]))
    ) {
      errors[key] = true
    } else {
      errors[key] = false
    }
  }
  return errors
}

export const validatePasswords = (password, password2, dispatch) => {
  if (password2 !== '' && isPasswordsMatch(password, password2)) {
    dispatch(showAlert('Registration Error', 'Passwords do not match'))
    return 'password2'
  } else if (password !== '' && validatePassword(password)) {
    dispatch(
      showAlert(
        'Registration Error',
        'Password must contain at least 6 characters, at least one small letter, one big letter, one number and a special character'
      )
    )
    return 'password'
  }
  return false
}

export const validatePassword = (password) => {
  return validators.checkPassword(password)
}

export const isPasswordsMatch = (pass1, pass2) => {
  return validators.matchPasswords(pass1, pass2)
}

export const validators = {
  checkString: (val) => {
    return val.trim() === '' || val === null || val === undefined
  },
  checkEmail: (val) => {
    return Validators.email(val)
  },
  checkPassword: (val) => {
    return Validators.password(val)
  },
  matchPasswords: (val1, val2) => {
    return Validators.matchPasswords(val1, val2)
  },
}
