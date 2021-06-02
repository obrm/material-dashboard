import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
import { validators, validate } from '../validators/validators.js'

router
  .route('/')
  .post(
    validators.email(),
    validators.password(),
    validators.userName(),
    validators.firstName(),
    validators.lastName(),
    validators.city(),
    validators.country(),
    validators.postalCode(),
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
