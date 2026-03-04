import { Request, Response } from 'express'
import { supabase } from '../lib/supabase'

export const getCustomers = async (req: Request, res: Response) => {
    try {
        const { query } = req.query
        let dbQuery = supabase.from('customers').select('*').order('created_at', { ascending: false })
        
        if (query) {
            dbQuery = dbQuery.or(`name.ilike.%${query}%,favorite_drink.ilike.%${query}%`)
        }

        const { data, error } = await dbQuery
        if (error) throw error
        res.json(data)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const addCustomer = async (req: Request, res: Response) => {
    try {
        const { name, contact, favorite_drink, interests } = req.body
        const { data, error } = await supabase.from('customers').insert({
            name, contact, favorite_drink, interests
        }).select().single()
        
        if (error) throw error
        res.status(201).json(data)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const seedCustomers = async (req: Request, res: Response) => {
    try {

        await supabase.from('customers').delete().neq('id', '00000000-0000-0000-0000-000000000000')

        const seedData = [
            { name: 'Budi Santoso', contact: '08123456789', favorite_drink: 'Gula Aren Latte', interests: ['sweet drinks', 'coffee addict'] },
            { name: 'Siti Aminah', contact: '08198765432', favorite_drink: 'Caramel Macchiato', interests: ['sweet drinks', 'caramel', 'afternoon coffee'] },
            { name: 'Agus Salim', contact: '08112233445', favorite_drink: 'Black Coffee', interests: ['black coffee', 'morning ritual'] },
            { name: 'Maya Sari', contact: '08155667788', favorite_drink: 'Oat Milk Latte', interests: ['oat milk', 'healthy choice', 'pastry lover'] },
            { name: 'Dewi Lestari', contact: '08133445566', favorite_drink: 'Matcha Latte', interests: ['non-coffee', 'tea lover', 'workshop'] }
        ]
        const { data, error } = await supabase.from('customers').insert(seedData).select()
        if (error) throw error
        res.json({ message: 'Seeded successfully', count: data?.length || 0 })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}
export const resetCustomers = async (req: Request, res: Response) => {
    try {
        const { error } = await supabase.from('customers').delete().neq('id', '00000000-0000-0000-0000-000000000000')
        if (error) throw error
        res.json({ message: 'All customers have been reset' })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}
