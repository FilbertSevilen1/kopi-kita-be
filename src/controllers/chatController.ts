import { Request, Response } from 'express'
import { supabase } from '../lib/supabase'
import { model } from '../lib/gemini'

export const chat = async (req: Request, res: Response) => {
    try {
        const { message, history } = req.body
        const { data: customers } = await supabase.from('customers').select('name, favorite_drink, interests')
        
        const customerContext = customers?.map(c => 
            `- ${c.name}: likes ${c.favorite_drink}, interested in ${c.interests?.join(', ')}`
        ).join('\n') || 'No customer data available.'

        const systemPrompt = `
            You are "Kopi Kita AI", a helpful assistant for Mimi, owner of Kopi Kita coffee shop.
            Data: ${customerContext}
            Answers about customers, suggest promos, be friendly and use Indonesian slang sparingly.
        `

        const chatSession = model.startChat({
            systemInstruction: systemPrompt,
            history: history.map((h: any) => ({ role: h.role, parts: [{ text: h.content }] }))
        })

        console.log('Sending message to AI:', message)
        const result = await chatSession.sendMessage(message)
        const responseText = result.response.text()
        console.log('AI Chat Response:', responseText)
        res.json({ content: responseText })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}
