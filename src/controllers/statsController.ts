import { Request, Response } from 'express'
import { supabase } from '../lib/supabase'

export const getStats = async (req: Request, res: Response) => {
    try {
        const { data: customers } = await supabase.from('customers').select('interests, created_at')
        const { data: promos } = await supabase.from('promos').select('id')

        const totalCustomers = customers?.length || 0
        const totalPromos = promos?.length || 0


        const allInterests = customers?.flatMap(c => c.interests || []) || []
        const interestCounts = allInterests.reduce((acc: Record<string, number>, curr) => {
            acc[curr] = (acc[curr] || 0) + 1
            return acc
        }, {})

        const sortedInterests = Object.entries(interestCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name, count]) => ({ name, count }))


        const now = new Date()
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)

        const recentCustomers = customers?.filter(c => new Date(c.created_at) > sevenDaysAgo).length || 0
        const previousCustomers = customers?.filter(c => {
            const date = new Date(c.created_at)
            return date <= sevenDaysAgo && date > fourteenDaysAgo
        }).length || 0

        let growth = 0
        if (previousCustomers > 0) {
            growth = Math.round(((recentCustomers - previousCustomers) / previousCustomers) * 100)
        } else if (recentCustomers > 0) {
            growth = 100
        }

        res.json({
            totalCustomers,
            totalPromos,
            topInterests: sortedInterests,
            growth: growth >= 0 ? `+${growth}%` : `${growth}%`,
            topInterestName: sortedInterests[0]?.name || 'None'
        })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}
