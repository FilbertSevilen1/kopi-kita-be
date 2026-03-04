import { Router } from 'express'
import { getPromos, generatePromos } from '../controllers/promoController'

const router = Router()

router.get('/', getPromos)
router.post('/generate', generatePromos)

export default router
