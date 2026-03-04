import { Request, Response, NextFunction } from 'express'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseAuth = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
)

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ error: 'Missing authorization header' })
    }

    const token = authHeader.split(' ')[1]

    try {
        const { data: { user }, error } = await supabaseAuth.auth.getUser(token)

        if (error || !user) {
            return res.status(401).json({ error: 'Invalid or expired token' })
        }

        (req as any).user = user
        next()
    } catch (err) {
        res.status(401).json({ error: 'Authentication failed' })
    }
}
