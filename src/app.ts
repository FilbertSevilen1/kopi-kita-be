import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { authenticate } from './controllers/authMiddleware'
import customerRoutes from './routes/customerRoutes'
import promoRoutes from './routes/promoRoutes'
import chatRoutes from './routes/chatRoutes'
import authRoutes from './routes/authRoutes'
import statsRoutes from './routes/statsRoutes'
import productRoutes from './routes/productRoutes'
import path from 'path'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/api/auth', authRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/promos', authenticate, promoRoutes)
app.use('/api/chat', authenticate, chatRoutes)
app.use('/api/stats', statsRoutes)
app.use('/api/products', productRoutes)

export default app