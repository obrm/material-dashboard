import { body, validationResult } from 'express-validator'

export const validators = {
  email: () => body('email', `Please enter a valid email address`).isEmail(),
  userName: () => body('userName', 'Username is required').not().isEmpty(),
}

export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}
