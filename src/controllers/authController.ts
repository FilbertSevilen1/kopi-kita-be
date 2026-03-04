import { Request, Response } from 'express'
import { supabase } from '../lib/supabase'

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) return res.status(401).json({ error: error.message })
        res.json(data)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) return res.status(400).json({ error: error.message })
        res.json(data)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const resendConfirmation = async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        const { data, error } = await supabase.auth.resend({
            type: 'signup',
            email,
        })

        if (error) return res.status(400).json({ error: error.message })
        res.json({ success: true, data })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}
