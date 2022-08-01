import express from 'express'
import { productRouter, cartRouter, userRouter } from './routes/index.js'
import authenticationMiddleware from './middleware/authentication.js'

const PORT = process.env.PORT

const server = express()

server.use(express.json())
server.use('/user', userRouter)
server.use(authenticationMiddleware)
server.use('/product', productRouter)
server.use('/cart', cartRouter)

server.listen(PORT, () => {
    console.log('servidor rodando...')
})