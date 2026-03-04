import { Request, Response } from 'express'

export const getProducts = (req: Request, res: Response) => {
    const products = [
        {
            id: '1',
            name: 'Americano',
            price: 3.50,
            description: 'Espresso kaya rasa yang dipadu dengan air panas untuk cita rasa yang halus dan kuat.',
            category: 'Klasik',
            image: '/products/americano.webp'
        },
        {
            id: '2',
            name: 'Doppio',
            price: 3.00,
            description: 'Dua shot espresso kami yang intens dan selembut sutra.',
            category: 'Klasik',
            image: '/products/doppio.webp'
        },
        {
            id: '3',
            name: 'Espresso',
            price: 2.50,
            description: 'Satu shot esensi kopi murni, diekstraksi dengan tekanan tinggi.',
            category: 'Klasik',
            image: '/products/espresso.webp'
        },
        {
            id: '4',
            name: 'Latte',
            price: 4.50,
            description: 'Susu steam selembut beludru yang dituangkan di atas dua shot espresso.',
            category: 'Andalan',
            image: '/products/latte.webp'
        },
        {
            id: '5',
            name: 'Lungo',
            price: 3.20,
            description: 'Espresso yang diperpanjang durasi ekstraksinya untuk rasa yang lebih ringan.',
            category: 'Klasik',
            image: '/products/lungo.webp'
        },
        {
            id: '6',
            name: 'Mocha',
            price: 5.00,
            description: 'Harmoni sempurna antara cokelat kaya rasa dan espresso kuat dengan susu steam.',
            category: 'Andalan',
            image: '/products/mocha.webp'
        },
        {
            id: '7',
            name: 'Ristretto',
            price: 2.80,
            description: 'Shot espresso yang lebih pendek dan terkonsentrasi untuk rasa yang lebih intens.',
            category: 'Klasik',
            image: '/products/ristreotto.webp'
        }
    ]

    res.json(products)
}
