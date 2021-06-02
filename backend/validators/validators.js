import { body, validationResult } from 'express-validator'

export const validators = {
  email: () => body('email', `Please enter a valid email address`).isEmail(),
  userName: () => body('userName', 'Username is required').not().isEmpty(),
  password: () => body('password', 'Password is required').not().isEmpty(),
  firstName: () => body('firstName', 'First name is required').not().isEmpty(),
  lastName: () => body('lastName', 'Last name is required').not().isEmpty(),
  city: () => body('address.city', 'City is required').not().isEmpty(),
  country: () => body('address.country', 'Country is required').not().isEmpty(),
  postalCode: () =>
    body('address.postalCode', 'Postal code is required').not().isEmpty(),
}

export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}
