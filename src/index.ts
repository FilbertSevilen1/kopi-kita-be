import app from '../src/app'

const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} (Local)`)
    })
}

export default app