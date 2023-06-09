import express from 'express'
import 'express-async-errors'
import cors from 'express-cors'
import { productRouter, cartRouter, userRouter, externalAPIRouter } from './routes/index.js'
import authenticationMiddleware from './middleware/authentication.js'
import authorizationMiddleware from './middleware/authorization.js'
import errorHandler from './middleware/errorHandler.js'
import { MAX_FILE_SIZe, PORT } from './constants.js'
import fileUpload from 'express-fileupload'
import 'uuid'
import pathLog from './middleware/pathLog.js'

const server = express()

server.use(cors({
    allowedOrigins: ['localhost']
}))
server.use(pathLog)
server.use(fileUpload({
    limits: {
        fileSize: MAX_FILE_SIZe,
    }
}))
server.use('./images', express.static('imagens'))
server.use(express.json())
server.use('/user', userRouter)
// server.use(authenticationMiddleware)
// server.use(authorizationMiddleware)
server.use('/product', productRouter)
server.use('/cart', cartRouter)
server.use('/third', externalAPIRouter)
server.use(errorHandler )

server.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`)
})