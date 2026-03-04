import { Router } from 'express'
import { getStats } from '../controllers/statsController'
import { authenticate } from '../controllers/authMiddleware'

const router = Router()

router.get('/', authenticate, getStats)

export default router
