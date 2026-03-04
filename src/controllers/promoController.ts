import { Request, Response } from 'express'
import { supabase } from '../lib/supabase'
import { model } from '../lib/gemini'

export const getPromos = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase.from('promos').select('*').order('created_at', { ascending: false }).limit(3)
        if (error) throw error
        res.json(data)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const generatePromos = async (req: Request, res: Response) => {
    try {
        const { data: customers } = await supabase.from('customers').select('name, favorite_drink, interests')

        let prompt: string

        if (customers && customers.length > 0) {
            const allInterests = customers.flatMap(c => c.interests || [])
            const interestCounts = allInterests.reduce((acc: Record<string, number>, curr) => {
                acc[curr] = (acc[curr] || 0) + 1
                return acc
            }, {})

            const sortedInterests = Object.entries(interestCounts)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 10)
                .map(([name, count]) => `${name} (${count} customers)`)
                .join(', ')

            prompt = `
                You are a marketing expert for a specialty coffee shop named "Kopi Kita".
                Based on the following top customer interests: ${sortedInterests}.
                Generate 3 distinct "Global Promo Ideas" that Mimi (the owner) can run this week.
                Format as JSON array with keys: theme, segment, whyNow, message, bestTime.
                Return ONLY the JSON array.
            `
        } else {
            prompt = `
                You are a marketing expert for a specialty coffee shop named "Kopi Kita".
                The shop is new and doesn't have customer data yet.
                Generate 3 creative and appealing "Global Promo Ideas" that a specialty coffee shop can run this week to attract new customers.
                Format as JSON array with keys: theme, segment, whyNow, message, bestTime.
                Return ONLY the JSON array.
            `
        }

        console.log('Generating promos with prompt:', prompt)
        const result = await model.generateContent(prompt)
        const responseText = result.response.text().replace(/```json\n?|\n?```/g, '').trim()
        console.log('AI Response:', responseText)
        const promos = JSON.parse(responseText)

        const { error: insertError } = await supabase.from('promos').insert(
            promos.map((p: any) => ({
                theme: p.theme,
                segment: p.segment,
                why_now: p.whyNow,
                message: p.message
            }))
        )

        if (insertError) throw insertError
        res.json(promos)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}
