import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
import { validators, validate } from '../validators/validators.js'

router
  .route('/')
  .post(
    validators.password(),
    validators.userName(),
    validators.firstName(),
    validators.lastName(),
    validators.city(),
    validators.country(),
    validators.postalCode(),
    validators.email(),
    validate,
    registerUser
  )
router.post(
  '/login',
  validators.email(),
  validators.password(),
  validate,
  authUser
)
router.route('/profile').put(protect, updateUserProfile)

export default router
