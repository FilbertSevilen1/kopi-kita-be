import { Router } from 'express'
import { getCustomers, addCustomer, seedCustomers, resetCustomers } from '../controllers/customerController'
import { authenticate } from '../controllers/authMiddleware'

const router = Router()

router.post('/seed', seedCustomers)
router.delete('/reset', resetCustomers)
router.get('/', authenticate, getCustomers)
router.post('/', authenticate, addCustomer)

export default router
