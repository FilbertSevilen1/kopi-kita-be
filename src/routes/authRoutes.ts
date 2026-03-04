import { Router } from 'express'
import { login, register, resendConfirmation } from '../controllers/authController'

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.post('/resend', resendConfirmation)

export default router
